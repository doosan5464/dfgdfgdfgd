/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import * as s from './style';
import { selectedLanguageState } from '../../../atoms/selectedLanguage/selectedLanguage';
import { useRecoilState } from 'recoil';

function CallManagerModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLanguage] = useRecoilState(selectedLanguageState);

    const languageTexts = {
        한국어: {
            callStaff: "직원호출",
            staffCalled: "직원을 호출하였습니다.",
            pleaseWait: "잠시만 기다려주세요.",
            confirm: "확인"
        },
        영어: {
            callStaff: "Call Staff",
            staffCalled: "Staff has been called.",
            pleaseWait: "Please wait a moment.",
            confirm: "OK"
        },
        중국어: {
            callStaff: "呼叫员工",
            staffCalled: "已呼叫员工。",
            pleaseWait: "请稍等。",
            confirm: "确认"
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div css={s.buttonText} onClick={openModal}>
                {languageTexts[selectedLanguage].callStaff}
            </div>
            {isModalOpen && (
                <div css={s.modalContainer}>
                    <div css={s.modalContent}>
                        <span css={s.modalText}>{languageTexts[selectedLanguage].staffCalled}</span>
                        <span css={s.modalText}>{languageTexts[selectedLanguage].pleaseWait}</span>
                        <button onClick={closeModal} css={s.closeButton}>
                            {languageTexts[selectedLanguage].confirm}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CallManagerModal;
