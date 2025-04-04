import { css } from "@emotion/react";

export const modalcontainer = css`
    display: flex;
    flex-direction: column;
`;

export const headline = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > button {
        margin-right: 2rem;
        box-sizing: border-box;
        border-radius: 1.5rem;
        border: none;
        padding: 1.1rem .8rem;
        font-size: 2rem;
        font-weight: 800;
        color: #fafafa;
        background-color: #e74f09;

        &:hover {
            box-shadow: 0 0 .4rem .1rem #e74f09;
        }

        &:active {
            box-shadow: 0 0 .4rem .1rem #c44002;
            background-color: #c44002;
        }
    }
`;

export const text = css`
    margin: 1rem 0 1rem 2rem;
    border-bottom: 0.5rem dashed #00000022;
    padding-bottom: 1rem;
    font-size: 2.5rem;
    font-weight: 600;
    text-align: center;
    width: 10em;
`;

export const modalhead = css`
    display: flex;
    justify-content: space-around;
    margin-bottom: 2.5rem;
    font-size: 2.2rem;
    font-weight: 500;
`;

export const headleft = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;

    & > div > img {
        border-radius: 1.5rem;
        width: 100%;
        height: auto;
        object-fit: contain;
        max-height: 21rem;
    }
`;

export const selectsize = (toggledSize) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 18rem;

    & > div {
        min-width: 9rem;
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

export const headright = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 3;
    white-space: nowrap;
    text-overflow: ellipsis;

    .onoff {
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: .3rem solid #00000055;
        padding: 0 0 2rem 0;
    }

    .idname {
        display: flex;
        padding: 2rem 0;
        
        .line {
            display: flex;
            flex-direction: column;
            align-items: center;
            border-right: .3rem solid #00000055;
            flex-grow: 1;

            
            & div {
                margin: 1rem 0;
            }
        }
        
        .line:nth-last-of-type(1) {
            border: none;
        }
    }
`;


export const exBox = css`
    display: flex;
    position: relative;
    padding: 0;
    width: 7rem;
    

    & input {
        appearance: none; /* 기본 체크박스 스타일을 제거 */
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        border-radius: 0.2rem; 
        border: 0.1rem solid #333333; 
        height: 1.8rem;
        width: 1.8rem;
        background-color: #eeeeee; 
        transition: all 0.15s ease-in-out;

        &:checked {
            border-radius: 35%; 
            border: none;
            background-color: #0d56dd;
            transform: scale(2);
        }

        &:checked::after {
            content: '✓';  /* V 모양을 텍스트로 표시 */
            font-size: 2.2rem;
            font-weight: 800;
            color: white;
        }
    }
`;


export const modalbody = css`
    display: flex;
    flex-direction: column;
`;

export const bodyup = css`
    display: flex;
    margin: 1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    
    
    .line {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-right: 0.1rem dashed #00000055;
        padding: 0 2rem;
        min-width: 5rem;
        font-size: 2.2rem;
        text-align: center;

        & > div {
            margin-top: 1.2rem;

        }

    }

    .line:nth-of-type(1) {
        min-width: 18rem;
        font-size: 2.2rem;
        font-weight: 600;
        border-right: 0.3rem solid #00000055;
    
    }
    .line:nth-last-of-type(1) {
        border: none;
    }
`;

export const bodydown = css`
    display: flex;
    align-items: center;
    margin: 3.5rem 0 2rem 3.5rem;
    font-size: 2.5rem;

    & div {
        border-left: 0.1rem dashed #00000055;
        padding: 0 1.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: fit-content;
    }

    & div:nth-of-type(1) {
        border: none;
        padding-right: 2rem;
        font-size: 3rem;
        font-weight: 500;
        overflow: unset;
    }
`;

export const modalfooter = css`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 2rem;
    padding: 0 10rem;

    & button {
        border: none;
        border-radius: 1rem;
        height: 8rem;
        width: 25rem;
        font-size: 2rem;
        font-weight: 800;
        color: #fafafa;
        background-color: #13a00eff;

        &:hover {
            box-shadow: 0 0 .6rem .1rem #13a00eff;
        }

        &:active {
            box-shadow: 0 0 .6rem .1rem #035a00ff;
            background-color: #035a00ff;
        }
    }

`;