import { css } from "@emotion/react";

export const container = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 2rem 3rem;
    background-color: #f8f9fa;
`;

export const conWrap = css`
    display: flex;
    justify-content: center;
    align-items: flex-start;  // 또는 center로 중앙 전체 정렬도 가능
    width: 100%;
`;

export const title = css`
    font-size: 2.4rem;
    font-weight: 700;
    color: #343a40;
    border-bottom: 2px solid #dee2e6;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
`;

export const infoContainer = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 60rem;
`;

export const infoBox = css`
    background: #ffffff;
    border-radius: 8px;
    margin-bottom: 1rem;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    width: 60rem;

    & > h3 {
        font-size: 1.6rem;
        font-weight: 700;
        color: #212529;
        margin-bottom: 0.5rem;
    }
`;

export const infoRow = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
`;

export const infoText = css`
    font-size: 2rem;
    color: #495057;
    flex-grow: 1;
    white-space: nowrap;
`;

export const inputField = css`
    flex-grow: 2;
    height: 3.5rem;
    padding: 0.5rem;
    border: 1px solid #ced4da;
    border-radius: 5px;
    font-size: 1.4rem;
`;

export const buttonSmall = css`
    padding: 0.6rem 1rem;
    font-size: 1.2rem;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        opacity: 0.8;
    }
`;

export const primaryButton = css`
    ${buttonSmall}
    background-color: #007bff;
    color: white;
    border: none;
    

    &:disabled {
        background-color: #adb5bd;
        cursor: not-allowed;
    }
`;

export const secondaryButton = css`
    ${buttonSmall}
    border: 2px solid #adb5bd;
    background-color: #ffffff;
    color: #495057;
`;

export const modalStyle = {
    overlay: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000066",
    },
    content: {
        position: "static",
        boxSizing: "border-box",
        borderRadius: "1.5rem",
        width: "37rem",
    },
};
