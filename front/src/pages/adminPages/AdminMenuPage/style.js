import { css } from "@emotion/react";

export const container = css`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const header = css`
    display: flex;
    justify-content: space-between;
    padding: 2rem 4rem;
    

    & > span {
        display: flex;
        justify-content: start;
        align-items: center;
        flex-grow: 4;
        min-width: 12rem;
        font-size: 4rem;
        font-weight: 600;
    }
    & > div {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-grow: 1;
        min-width: 12rem;
    }
`;

export const title = css`
    margin: 0.5rem 0 0 1.5rem;
    font-size: 2rem;
    font-weight: 500;
`;

export const buttons = css`
    padding: 0.4rem 1.5rem;
    box-sizing: border-box;
    border: 0.2rem solid #77ac58;
    border-radius: 0.5rem;
    font-size: 2.3rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: #00000011;
    }

    &:active {
        background-color: #00000033;
    }
`;

export const menuListContainer = css`
    margin: 0;
    padding: 0;
    border-radius: 1rem;
    background-color: #ffffff;
    box-shadow: 0 0 0.3rem 0.1rem #00000022;
    overflow: hidden;

    & li {
        display: flex;
        justify-content: start;
        border-bottom: 0.1rem solid #dbdbdb;
        
        cursor: default;
        &:nth-of-type(1) {
            background-color: #004417;
            & > div {
                color: #ffffff;
            }
        }
        &:not(&:nth-of-type(1)) {
            cursor: pointer;

            &:hover {
                background-color: #00000011;
            }
        } 
        
        & div {
            justify-content: center;
            align-items: center;
            align-content: center;
            margin: 1rem 4rem 1rem 0;
            text-align: center;
            font-size: 1.6rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex-grow: 1;    
        }
    }
`;

export const numBox = css`
    width: 4rem;
`;

export const nameBox = css`
    width: 15rem;
`;

export const priceBox = css`
    width: 6rem;
`;

export const exBox = css`
    display: flex;
    position: relative;
    padding: 0;
    width: 7rem;
    

    & input {
        appearance: none; /* 기본 체크박스 스타일을 제거 */
        margin: 0;
        border-radius: 0.2rem; 
        border: 0.1rem solid #333333; 
        height: 1.8rem;
        width: 1.8rem;
        background-color: #eeeeee;  

        &:checked {
            border-radius: 35%; 
            border: none;
            height: 2.6rem;
            width: 2.6rem;
            background-color: #d18828;
            transition: ease-out 0.15s;
        }

        &:checked::after {
            content: '✓';  /* V 모양을 텍스트로 표시 */
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%); 
            font-size: 2.4rem;
            font-weight: 800;
            color: white;
        }
    }
`;


export const footer = css`
    display: flex;
    justify-content: center;
    margin: 2rem 0 2rem 0;

    & button {
        padding: 1rem;
        border: none;
        border-radius: 1rem;
        background-color: transparent;
        cursor: pointer;
    }

    & button:disabled {
        opacity: 0;
        cursor: default;
    }
`;

export const pageNum = (isSelect) => css`

    font-size: 1.5rem;
    font-weight: 600;
    /* color: ${isSelect ? "#ffffff" : "#000000"}!important; */
    background-color: ${isSelect ? "#bbbbbb" : "#ffffff00"}!important;
`;




