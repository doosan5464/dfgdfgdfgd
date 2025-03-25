import React, { useState } from "react";
/**@jsxImportSource @emotion/react */
import * as s from './style';
import { usePhoneNumberCheckMutation } from "../../../mutations/userMutation";

const SavePoint = () => {
    const [input, setInput] = useState("");
    const [status, setStatus] = useState(null); // 1: 확인, 0: 넘어가기
    console.log("마일리지 적용하나요? ", status);

    const checkPhoneNumber = usePhoneNumberCheckMutation();  // 수정된 부분

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
                console.log("아아아 : ",formatPhoneNumber);
                const phoneNumberWithHyphen = formatPhoneNumber(formattedPhoneNumber); // 다시 하이픈 추가
                console.log("가가가 : ", phoneNumberWithHyphen);
                // 가가가 :  010-1111-1111

                // 전화번호 중복 확인 API 호출
                try {
                    const response = await checkPhoneNumber.mutateAsync(phoneNumberWithHyphen);
                    console.log("서버 응답:", response);

                    if (response?.data) {
                        alert(`서버 응답: ${JSON.stringify(response.data)}`);
                        alert("이미 있는 번호입니다. 마일리지를 적립합니다.");
                    } else {
                        alert("새로운 번호입니다. 해당 번호로 마일리지를 적립합니다.");
                    }
                } catch (error) {
                    console.error("에러 발생:", error);
                    alert("전화번호 확인 중 오류가 발생했습니다.");
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
