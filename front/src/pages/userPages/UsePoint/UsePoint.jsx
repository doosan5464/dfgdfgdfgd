/**@jsxImportSource @emotion/react */
import * as s from './style';
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UsePointModal from "../../../components/Modal/UsePointModal/UsePointModal";
import { getPointApi } from '../../../apis/pointApi';

const UsePoint = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [input, setInput] = useState(""); // 전화번호 입력값 상태
    const [point, setPoint] = useState(location.state?.point || 0); // 포인트 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
    const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태

    // 전화번호 포맷팅 함수
    const formatPhoneNumber = (value) => {
        value = value.replace(/[^0-9]/g, ""); // 숫자만 남김
        if (value.length <= 3) return value;
        if (value.length <= 7) return `${value.slice(0, 3)}-${value.slice(3)}`;
        return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    };

    const handleKeypadClick = (key) => {
        if (key === "×") {
            // 마지막 숫자 삭제 (백스페이스)
            setInput((prev) => prev.slice(0, -1));
        } else {
            // 숫자 입력
            setInput((prev) => formatPhoneNumber(prev + key));
        }
    };

    const handleBackOnClick = () => {
        navigate("/prePayment")
    }

    // 포인트 조회 버튼 클릭
    const handlePointCheck = async () => {
        const formattedPhoneNumber = input.replace(/-/g, ""); // 하이픈 제거
        const phoneNumberWithHyphen = formatPhoneNumber(formattedPhoneNumber); // 다시 하이픈 추가

        if (formattedPhoneNumber.length === 11) {
            try {
                const pointData = await getPointApi(phoneNumberWithHyphen);
                // 포인트 조회 성공 시 처리
                setPoint(pointData);
                setIsModalOpen(true); // 모달 열기
                setErrorMessage(""); // 에러 메시지 초기화
            } catch (error) {
                // 404 오류 처리
                setErrorMessage("입력하신 번호는 등록된 번호가 아닙니다.");
                setIsModalOpen(false); // 모달 닫기
            }
        } else {
            setErrorMessage("전화번호 11자리를 입력해주세요.");
            setIsModalOpen(false); // 모달 닫기
        }
    };

    return (
        <>
            <div css={s.container}>
                <img src="https://cdn-icons-png.flaticon.com/512/99/99656.png" alt="" css={s.img} />
                <p css={s.p}>전화번호를 입력하고 포인트 조회하기</p>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(formatPhoneNumber(e.target.value))}
                    css={s.input}
                    placeholder="전화번호 입력"
                />
                <div css={s.keypad}>
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "×", "0"].map((key) => (
                        <button
                            key={key}
                            onClick={() => handleKeypadClick(key)}
                            css={s.button}
                        >
                            {key}
                        </button>
                    ))}
                </div>
                <div css={s.foott}>
                    <button css={s.footer} onClick={handlePointCheck}>포인트 조회</button>
                    <button css={s.footer} onClick={handleBackOnClick}>뒤로 가기</button>
                </div>
                
                {/* 에러 메시지가 있을 경우 표시 */}
                {errorMessage && <p css={s.errorMessage}>{errorMessage}</p>}
            </div>

            {/* 모달 조건부 렌더링 */}
            {isModalOpen && <UsePointModal phoneNumber={input} closeModal={() => setIsModalOpen(false)} />}
        </>
    );
};

export default UsePoint;
