import { css } from "@emotion/react";

export const container = css`
    display: flex;
    flex-direction: column;
    width: 40rem;
    height: 71.1rem;
    border: 0.2rem solid black;
`;

export const logoAnd2button = css`
    display: flex;
    width: 100%;
    height: 15%;
`;

export const mcdonaldLogo = css`
    display: flex;
    justify-content: center;
    height: 100%;
    width: 30%;
`;

export const buttons = css`
    display: flex;
    width: 80%;
    height: 100%;
    align-items: center;
    justify-content: space-evenly;
    font-size: 1.8rem;
    font-weight: 500;
    

    & > div {
        display: flex;
        border: 0.1rem solid black;
        width: 10rem;
        height: 4.5rem;
        justify-content: center;
        align-items: center;
        background-color: #ffd154;
        cursor: pointer;
    }
`;

export const body = css`
    display: flex;
    width: 100%;
    height: 65%;
`;

export const category = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 32%;
    font-size: 1.5rem;
    font-weight: 500;

    & > div {
        position: relative;
        display: flex;
        flex-direction: column;
        margin: 0.4rem;
        align-items: center;
        border: 0.1rem solid black;
        align-items: start;
        justify-content: center;
        padding-left: 0.3rem;
        height: 3rem;
        cursor: pointer;
        background-color: #ffd154;
    }
`;

export const menu = css`
    display: flex;
    height: 100%;
    width: 100%; 
    flex-wrap: wrap; // 부모도 wrap 적용
    align-items: flex-start; // 줄 간격을 최소화
    overflow-y: auto;  /* 세로 스크롤 가능하게 설정 */
    max-height: 100%;  /* 부모 요소 높이를 초과하면 스크롤 */

    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        display: none;
    }
    
    & > div {
        flex-wrap: wrap;
        display: flex;
        
        & > div {
            display: flex;
            flex-direction: column;
            width: 30%;
            height: 12rem;
            border: 0.1rem solid black;
            margin: 0.3rem;
            box-shadow: 0.2rem 0.2rem 0.2rem rgba(0,0,0,0.25); 

            & > img {
                display: flex;
                width: 100%;
                height: 80%;
                justify-content: center;
                align-items: center;
                overflow: hidden;
            }

            & > p {
                display: flex;
                width: 100%;
                height: 1%;
                justify-content: center;
                align-items: center;
                font-size: 0.8rem;
                font-weight: 750;
            }
        }
    }
`;

export const pay = css`
    display: flex;
    /* flex-direction: column; */
    width: 100%;
    height: 20%;
    border-top: 0.2rem solid black;
    background-color: #ffd154;
    
    & > img {
        margin-top: 1rem;
        margin-left: 1rem;
        margin-right: 1rem;
        width: 5rem;
        height: 5rem;
    }

    & > div {
        display: flex;
        margin: 0;
        padding: 0;
        width: 100%;
        background-color: pink;
        font-size: 1.1rem;
    }
    
    & > span {
        display: flex;
        flex-direction: column;
        background-color: beige;
        width: 10rem;
        justify-content: space-between;
        margin-right: 1rem;
        
        & > p {
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            background-color: #ffd999;
            border-radius: 1rem;
        }
    }
`;