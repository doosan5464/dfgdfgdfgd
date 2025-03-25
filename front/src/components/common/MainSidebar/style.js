import { css } from "@emotion/react";

// 기존 스타일 유지
export const container = css`
    display: flex;
    flex-direction: column;
    border-right: 0.2rem solid #71b855;
    width: 25rem;
    height: 100%;
    background-color: #dddddd;
`;

export const header = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    font-size: 3rem;
    font-weight: 800;
`;

export const headerLink = css`
    text-decoration: none;
`

export const body = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
`;

export const emptybutton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 0.5rem 2rem;
    background-color: transparent;
    width: 20rem;
    height: 5rem;
    font-size: 1.6rem;
    font-weight: 800;
    cursor: pointer;
`;

export const buttonstyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0 1.5rem 0;
    border-radius: 0.5rem;
    border: 0.2rem solid #9cb163;

    background-color: #eeeeee;

    &:hover {
        background-color: #00000011;
    }

    &:active {
        background-color: #00000033;
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
    display: flex;
    flex-grow: 1;
`;
