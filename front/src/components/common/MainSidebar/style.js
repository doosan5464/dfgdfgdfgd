import { css } from "@emotion/react";

// 기존 스타일 유지
export const container = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 0.2rem solid #dbdbdb;
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
    width: 25rem;
    height: 100%;
`;

export const header = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    font-size: 3rem;
    font-weight: 800;
    white-space: nowrap;
`;

export const headerLink = css`
    text-decoration: none;
`

export const body = css`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const menuButton = (isActive) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 2rem 1.5rem 2rem;
    border-radius: 1rem;
    border: none;
    padding: 0.5rem 2rem;
    background-color: #fafafa;
    width: 20rem;
    height: 5rem;
    font-size: 1.6rem;
    font-weight: 800;
    cursor: pointer;
    box-shadow: ${isActive ? "0 0 0.3rem 0.2rem #005a0575" : "0 0 0.3rem 0.1rem #00000022"};

    &:hover {
        box-shadow: 0 0 0.5rem 0.3rem #005a0575;
    }
`;

export const buttonstyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 2rem 1.5rem 2rem;
    border-radius: 1rem;
    border: 0.2rem solid #dbdbdb;

    background-color: #fafafa;

    &:hover {
        background-color: #00000011;
    }
`;

// 추가: 클릭된 버튼에만 적용할 강조 스타일
export const activeButton = css`
    background-color: #00000033;  // 강조 색을 여기서 정의
    color: white;
    border: none;
    font-weight: 800;
`;

export const footer = css`
    margin-bottom: 5rem;
`;
