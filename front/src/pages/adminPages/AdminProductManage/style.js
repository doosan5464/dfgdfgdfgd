import { css } from "@emotion/react";

// 상품 정보 컨테이너
export const productContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
`;

// 이미지 영역
export const imageCon = css`
    display: flex;
    flex-direction: column;
    margin-right: 5rem;

    & > span {
        text-align: center;
        font-size: 1.4rem;
        margin: 0.7rem 0 2rem 0;
    }
`;

export const imageBox = css`
    width: 30rem;
    height: 25rem;
    background: white;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;

    & > img {
        width: 100%;
    }

    & > span {
        font-size: 1.4rem;
    }
`;

// 입력 필드 그룹
export const inputGroup = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3rem;
    

    & > div {
        width: 60rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

// 선택
export const dropdownContainer = css`
    margin-bottom: 1rem;
`;

export const dropdown = css`
    width: 50%;
    height: 4.5rem;
    padding: 0 3rem;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 6px;
`;

export const label = css`
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 0.2rem;
`;

export const input = css`
    width: 50%;
    height: 4.5rem;
    padding: 0 3rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
`;

// 버튼 그룹
export const buttonGroup = css`
    width: 100%;
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;

    & > button:nth-of-type(2) {
        margin: 0 2rem;
    }
`;

export const button = css`
    flex-grow: 1;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    height: 4rem;
    background-color: #ffcc00;
    cursor: pointer;

    &:hover {
        background: #ffdd33;
}
`;
