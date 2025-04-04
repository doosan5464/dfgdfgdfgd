import { css } from "@emotion/react";

export const modalhead = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 15rem;

    & > div {
        display: flex;
        flex-direction: column;
        margin-left: 1rem;
        font-size: 2rem;
        font-weight: 600;

        & > img {
            border-radius: 1.5rem;
            width: 100%;
            height: auto;
            object-fit: contain;
            max-height: 21rem;
        }
        
        & > div {
            padding: 1rem 0 1rem 0;
        }

        & > div:nth-of-type(2){
            text-align: center;
            min-width: 12rem;
        }
    }
`;


export const selectsize = (toggledSize) => css`
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
        min-width: 8rem;
    }

    & > label {
        position: relative;
        display: inline-block;
        margin-left: 3rem;
        width: 6rem;
        height: 3.1rem;
        
        & > input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        & > span {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #06b30f;
            transition: 0.4s;
            border-radius: 3rem;

            &::before {
                position: absolute;
                box-shadow: 0 0 0.5rem 0.1rem #000000cc;
                height: 25px;
                width: 25px;
                border-radius: 50%;
                left: 0.3rem;
                bottom: 0.3rem;
                background-color: white;
                transition: 0.4s;
                content: "";
            }
        }
    }

    & > label > input:checked + span { //배경색 변경
        background-color: #1d4ce9;

    }

    & > label > input:checked + span::before { //동그라미 이동
        transform: translateX(29px);
    }
`;

export const text1 = css`
    margin: 1rem 0 1rem 0rem;
    border-bottom: 0.5rem dashed #00000022;
    padding-bottom: 1rem;
    font-size: 2.5rem;
    font-weight: 600;
    text-align: center;
    width: 10em;
`;


export const modalbody = css`
    display: flex;
    flex-direction: column;
`;

export const bodyup = css`
    display: flex;
    justify-content: center;
    margin: 1rem 0;
    box-shadow: 0 0 .5rem .2rem;
    box-sizing: border-box;
    border-radius: 2rem;
    padding: 1.5rem 1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    
    .line {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-right: 0.1rem dashed #00000055;
        min-width: 5rem;
        font-size: 1.8rem;
        text-align: center;

        & div {
            padding: .3rem .8rem;
        }


    }

    .line:nth-of-type(1) {
        padding-right: 2rem;
        font-size: 2rem;
        font-weight: 600;
        border-right: 0.3rem solid #00000055;

        & > div {
            background-color: #00000000;
        }
    }
    .line:nth-last-of-type(1) {
        border: none;
    }

`;

export const bodydown = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2rem 0;
    font-size: 2.5rem;


`;

export const origin = css`
    display: flex;
    align-items: center;
    padding: 1rem;
    overflow-x: auto;
    text-overflow: ellipsis;
    min-height: 5rem;
    max-width: 100%;

    &::-webkit-scrollbar {
        display: none;  /* 스크롤바 숨기기 */
    }


    & div {
        border-left: 0.1rem dashed #00000055;
        padding: 0 2rem;
        white-space: nowrap;
    }

    & div:nth-of-type(1) {
        border: none;
    }



`;

export const text2 = css`
    margin: 1rem 0 1rem 0rem;
    border-bottom: 0.5rem dashed #00000022;
    padding-bottom: 1rem;
    font-size: 2.5rem;
    font-weight: 600;
    text-align: center;
    width: 10em;
`;


export const footer = css`
    display: flex;
    justify-content: center;
    align-items: center;

    & > button {
        box-sizing: border-box;
        border: none;
        border-radius: 1.4rem;
        padding: 2rem 3rem;
        font-size: 1.8rem;
        font-weight: 700;
        color: #fafafa;
        background-color: #f13709;

        &:hover {
            background-color: #be2a05;
        }

        &:active {
            background-color: #8d1c00;
        }
    }
`;