import { css } from "@emotion/react";

// 모달 백그라운드 스타일 (반투명 어두운 배경)
export const modalBackdrop = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

// 모달 내부 컨테이너 스타일
export const modalContainer = css`
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    width: 80%;
    max-width: 30rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    position: relative;
    overflow: hidden;

    & > h1,p {
        font-size: 2rem;
    }
`;

// 모달 제목 스타일
export const modalTitle = css`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

// 포인트 표시 스타일 (모달 내에서 사용)
export const modalPointDisplay = css`
    font-size: 1.8rem;
    font-weight: 550;
    margin-bottom: 2rem;
`;

// 키패드 스타일 (모달 내에서 사용)
export const keypad = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin: 2rem 4rem;
`;

// 키패드 버튼 스타일
export const button = css`
    width: 5rem;
    height: 5rem;
    background-color: white;
    border: 1px solid #ffd154;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    font-weight: 550;
    margin: 0.3rem;
    cursor: pointer;

    &:hover {
        background-color: #ffe08a;
    }

    &:active {
        background-color: #ffd154;
    }
`;

// 사용자가 입력하는 포인트 입력란 스타일
export const inputField = css`
    width: 80%;
    height: 3rem;
    font-size: 1.8rem;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    background-color: #f9f9f9;
`;

// 모달 닫기 버튼 스타일
export const closeButton = css`
    width: 100%;
    height: 4rem;
    background-color: #ffd154;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    font-weight: 550;
    cursor: pointer;
    margin-top: 1rem;

    &:hover {
        background-color: #ffcc00;
    }

    &:active {
        background-color: #e6b800;
    }
`;
export const footer = css`
    box-sizing: border-box;
    border: 1px solid #ffffff;
    padding: 1rem 6rem;
    background-color: #ffd154;
    border-radius: 0.5rem;
    font-size: 2rem;
    font-weight: 600;

    &:hover {
        background-color: #ffcc00;
    }

    &:active {
        background-color: #e6b800;
    }
`;