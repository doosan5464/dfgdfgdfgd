import { css } from "@emotion/react";

export const container = css`
    display: flex;
    flex-direction: column;
    width: 40rem;
    height: 71.1rem;
    border: 0.2rem solid black;
`;

export const logoAnd2button = css`
    box-sizing: border-box;
    display: flex;
    padding: 0 1.6rem;
    width: 100%;
    height: 15%;
`;

export const mcdonaldLogo = css`
    display: flex;
    justify-content: center;
    height: 100%;
    width: 12rem;
    overflow: hidden;

    & > img {
        height: 100%;
    }
`;

export const buttons = css`
    display: flex;
    flex-grow: 1;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    font-size: 1.6rem;
    font-weight: 500;

    & > div {
        display: flex;
        margin-right: 1.6rem;
        border-radius: 1rem;
        width: 10rem;
        height: 4.5rem;
        justify-content: center;
        align-items: center;
        background-color: #1c7a2c;
        color: #fff;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
        &:hover {
            box-shadow: 0 0 0.3rem 0.1rem #1c7a2c88;
        }
    }

`;

export const body = css`
    box-sizing: border-box;
    display: flex;
    padding: 0 1.6rem;
    flex-grow: 1;
`;

export const category = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-top: 0.2rem;
    height: 100%;
    width: 15rem;
    font-size: 1.5rem;
    font-weight: 500;

    & > div {
        transition: all 0.1s ease-in-out;
        position: relative;
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
        align-items: center;
        border-radius: 0.7rem;
        align-items: center;
        justify-content: center;
        height: 4.6rem;
        color: #444444;
        box-shadow: 0 0 0.5rem 0.2rem #00000010;
        cursor: pointer;
        background-color: #ffffff;

        &:hover {
            box-shadow: 0 0 0.6rem 0.1rem #ffa600e1;
        }
    }
`;

export const menu = css`
    display: flex;
    height: 56rem;
    width: 100%; 
    flex-wrap: wrap; // 부모도 wrap 적용
    justify-content: flex-end;
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
        justify-content: flex-start;
        
        & > div {
            display: flex;
            flex-direction: column;
            width: 15rem;
            height: 15rem;
            margin: 0.3rem;
            color: #444444;
            border-radius: 0.4rem;
            box-shadow: 0 0 0.3rem 0.1rem #00000017;
            overflow: hidden;
            transition: all 0.1s ease-in-out;
            &:hover {
                box-shadow: 0 0 0.6rem 0.1rem #ffa600e1;
            }

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
                color: #444444;
            }
        }
    }
`;

export const pay = css`
    box-sizing: border-box;
    display: flex;
    padding: 2rem;
    width: 100%;
    height: 20rem;
    background-color:#fafafa;
    border-top-left-radius: 0.8rem;
    border-top-right-radius: 0.8rem;
    box-shadow: 0 -0.2rem 0.4rem 0.1rem #00000022 ;

    & > div {
        display: flex;
        width: 100%;
        font-size: 1.1rem;
        overflow-y: auto;

        & > ul {
            flex-grow: 1;
            margin: 0;
            padding: 0;
            list-style-type: circle;

            & > li {
                box-sizing: border-box;
                display: flex;
                align-items: center;
                padding: 0.6rem;
                width: 100%;
            }
        }

    
        &::-webkit-scrollbar {
            display: none;
        }
    }
    
    & > span {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        & > p {
            box-sizing: border-box;
            display: flex;
            margin: 0;
            width: 10rem;
            height: 10rem;
            justify-content: center;
            align-items: center;
            background-color: #1c7a2c;
            border-radius: 1rem;
            font-size: 1.4rem;
            color: white;
            cursor: pointer;
            &:nth-of-type(1) {
                margin-bottom: 1rem;
            }
        }
    }
`;

export const cartList = css`
    display: flex;
    width: fit-content;
    font-size: 1.4rem;
    cursor: default;
`;

export const cartListButtons = css`
    display: flex;
    align-items: center;
    flex-grow: 1;
    margin-left: 1rem;

    & > div {
        display: flex;
        flex-direction: column;
        
        & > button {
            border: none;
            cursor: pointer;
            background-color: transparent;
            font-size: 1.2rem;
            line-height: 0.8rem;
        }
    }

    & > span  {
        & > button {
            border: none;
            cursor: pointer;
            background-color: transparent;
            font-size: 1.2rem;
            margin-left: 1rem;
            background-color: #db4455;
            border-radius: 0.4rem;
            padding: 0.3rem 1rem;
            color: #fafafa;
        }
    }
`;