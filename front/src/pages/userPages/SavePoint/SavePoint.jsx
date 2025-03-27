// SavePoint.jsx
import React, { useState } from "react";
/**@jsxImportSource @emotion/react */
import * as s from './style';
import { useProcessPointMutation } from "../../../mutations/useProcessPointMutation";
import { useLocation, useNavigate } from "react-router-dom";

const SavePoint = () => {
    const navi = useNavigate();
    
    const location = useLocation();
    const [point, setPoint] = useState(location.state?.point || 0);

    console.log("으익 : ", point);
    console.log("꾸익 : ", location.state?.orderId);

    const [input, setInput] = useState("");
    const [status, setStatus] = useState(null); // 1: 확인, 0: 넘어가기
    const [calcul, setCalcul] = useState(1);  // 포인트 적립(1) 기본 설정

    const { mutateAsync: processPoint } = useProcessPointMutation();  // 포인트 적립 처리 API 호출


    // 전화번호 포맷팅 함수
    const formatPhoneNumber = (value) => {
        value = value.replace(/[^0-9]/g, "");  // 숫자만 남김
        if (value.length <= 3) return value;
        if (value.length <= 7) return `${value.slice(0, 3)}-${value.slice(3)}`;
        return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    };

    // 버튼 클릭 처리 함수
    const handleButtonClick = async (value) => {
        if (value === "×") {
            setInput(formatPhoneNumber(input.slice(0, -1)));
        } else if (value === "확인") {
            if (input.replace(/-/g, "").length === 11) {
                setStatus(1);
                alert(`입력된 번호: ${input}`);

                // 전화번호 포맷팅 후 API 호출
                const formattedPhoneNumber = input.replace(/-/g, ""); // 하이픈 제거
                const phoneNumberWithHyphen = formatPhoneNumber(formattedPhoneNumber); // 다시 하이픈 추가

                try {
                    await processPoint({
                        phoneNumber: phoneNumberWithHyphen,
                        calcul: 1,  // 포인트 적립
                        point: point,
                    });
                    console.log("악0");
                    alert(`포인트 ${point}점이 적립되었습니다!`);
                    console.log("악1");
                    setPoint(0);
                    console.log("악2");
                    console.log("여기서도 orderId가 됨 : ", location.state?.orderId); 
                    navi("/exportOrderId", {
                        state: {
                            orderId: location.state?.orderId
                        }
                    });
                } catch (error) {
                    alert("포인트 적립 중 오류가 발생했습니다.");
                }
            } else {
                alert("전화번호 11자리를 입력해주세요.");
            }
        } else {
            if (input.replace(/-/g, "").length < 11) {
                setInput(formatPhoneNumber(input + value));
            }
        }
    };

    const handleSkip = () => {
        setStatus(0);

        navi("/exportOrderId", {
            state: {
                orderId: location.state?.orderId
            }
        });
    };

    return (
        <div css={s.background}>
            <div css={s.container}>
                <p>적립할 번호를 입력해주세요</p>
                <input type="text" value={input} readOnly css={s.input} />
                <div css={s.keypad}>
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "×", "0", "확인"].map((key) => (
                        <button 
                            key={key} 
                            onClick={() => handleButtonClick(key)} 
                            css={s.button} 
                        >
                            {key}
                        </button>
                    ))}
                </div>
                <button css={s.footer} onClick={handleSkip}>넘어가기</button>
            </div>
        </div>
    );
};

export default SavePoint;