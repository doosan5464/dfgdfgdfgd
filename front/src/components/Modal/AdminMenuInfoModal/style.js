import { css } from "@emotion/react";

export const modalcontainer = css`
    display: flex;
    flex-direction: column;
`;

export const text = css`
    margin: 1rem 0 1rem 0rem;
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
    font-size: 2.5rem;
    font-weight: 500;
`;

export const headleft = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;

    & > div > img {
        border-radius: 1.5rem;
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
        font-size: 2.5rem;
        width: 100%;
        text-align: center;

        & > div {
            margin-top: 1.2rem;

        }

    }

    .line:nth-of-type(1) {
        min-width: 18rem;
        font-size: 2.5rem;
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
    margin: 2rem 0 2rem 3.5rem;
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
        border-radius: 1rem;
        height: 8rem;
        width: 25rem;
        font-size: 2rem;
        font-weight: 800;
        background-color: #ffd900aa;

        &:hover {
            background-color: #cfb000aa;
        }

        &:active {
            background-color: #a58c00;
        }
    }

`;