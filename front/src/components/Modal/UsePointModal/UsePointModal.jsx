/** @jsxImportSource @emotion/react */
import * as s from './style';
import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { getPointApi } from "../../../apis/pointApi"; // 포인트 조회 API
import { usePointMutation } from '../../../mutations/useProcessPointMutation';
import { useNavigate } from 'react-router-dom';

// 키패드를 통해 포인트를 입력하고 사용하는 컴포넌트
function UsePointModal({ phoneNumber, closeModal }) {
    const navigate = useNavigate();
    const [point, setPoint] = useState(0); // 조회된 포인트 상태
    const [usePoint, setUsePoint] = useState(0); // 사용자가 입력한 포인트 상태

    const { mutateAsync: usePointmutation } = usePointMutation();

    // 포인트 조회 API 호출
    const { mutateAsync: getPoint } = useMutation({
        mutationFn: getPointApi,
        onSuccess: (response) => {
            setPoint(response.point); // API 응답에서 포인트 설정
            console.log(response);
        },
        onError: (error) => {
            alert(error.message || "포인트 조회 실패");
        },
    });

    useEffect(() => {
        if (phoneNumber) {
            getPoint(phoneNumber).then((response) => {
                console.log("API Response from getPoint:", response);
            });
        }
    }, [phoneNumber, getPoint]);

    // 키패드 입력 처리 함수
    const handleKeypadClick = (key) => {
        if (key === "×") {
            // 마지막 숫자 삭제
            setUsePoint(prev => Math.floor(prev / 10));
        } else if (key === "확인") {
            // 포인트 사용 확인
            handleUsePoint();
        } else {
            // 숫자 입력
            setUsePoint(prev => prev * 10 + parseInt(key));
        }
    };

    // 포인트 사용 처리
    const handleUsePoint = async () => {
        // 포인트가 100의 배수가 아니면 알림 띄우기
        if (usePoint % 100 !== 0) {
            alert("포인트는 100단위로만 사용 가능합니다.");
            return;
        }

        if (usePoint < 2000) {
            alert("최소 사용 포인트는 2000점입니다.");
            return; // 최소 사용 포인트 2000 미만일 경우 사용 불가
        }

        

        if (usePoint > 0 && usePoint <= point) {       
                alert(`포인트 ${usePoint}점 사용되었습니다.`);
                closeModal(); // 모달 닫기
                navigate("/payment", { 
                    state: { 
                        usePoint: usePoint,
                        phoneNumber: phoneNumber
                    }
                 });
                 console.log(phoneNumber)
                 console.log(usePoint)
        } else {
            alert("사용할 포인트가 유효하지 않습니다.");
        }
    };

    return (
        <div css={s.modalBackdrop}>
            <div css={s.modalContainer}>
                <h1>포인트 조회</h1>
                <p>전화번호: {phoneNumber}</p>
                <p>조회된 포인트: {point}점</p>

                {/* 키패드 입력 */}
                <div>
                    <input
                        type="text"
                        value={usePoint}
                        readOnly
                        placeholder="사용할 포인트"
                    />
                </div>

                {/* 키패드 */}
                <div css={s.keypad}>
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "×", "0", "확인"].map((key) => (
                        <button
                            key={key}
                            onClick={() => handleKeypadClick(key)}
                            css={s.button}
                        >
                            {key}
                        </button>
                    ))}
                </div>

                <button onClick={closeModal}>닫기</button>
            </div>
        </div>
    );
}

export default UsePointModal;
