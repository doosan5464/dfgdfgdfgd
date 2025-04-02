import { css } from "@emotion/react";

export const container = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding-bottom: 2rem;
    height: 100%;
    width: 100%;
`;

export const closebutton = css`
    display: flex;
    justify-content: end;

    & button {
        text-align: center;
        box-sizing: border-box;
        border-radius: 50%;
        border: none;
        padding: .4rem .6rem;
        font-size: 2rem;
        background-color: transparent;

        &:hover {
            color: #000000aa;
        }

        &:active {
            color: #00000033;
        }
    }
`;

export const head = css`
    display: flex;
    justify-content: space-around;
    margin-top: 2rem;
    font-size: 2.2rem;

    & > div {
        margin: 0 6rem 0 4rem;
        box-sizing: border-box;
        width: fit-content;
    }

    & > div > div {
        padding: 0 10rem 0 1.5rem;
    }

    & > div div:nth-of-type(1) {
        border-bottom: .2rem dashed #00000044;
        padding-bottom: .5rem;
        font-weight: 500;
    }

    & > div div:nth-of-type(2) {
        box-sizing: border-box;
        padding-bottom: .5rem;
    }
`;

export const body = css`
    display: flex;
    justify-content: space-around;
    margin-top: 5rem;


    & > div {
        margin-right: 5rem;
    }

    & div div:nth-of-type(1) {
        border-bottom: .2rem dashed #00000044;
        box-sizing: border-box;
        padding: 0 20rem .5rem 1.5rem;
        font-size: 2.2rem;
        font-weight: 500;
        width: fit-content;
    }

    & div div:nth-of-type(2) {
        box-sizing: border-box;
        padding: 1.2rem 0.5rem 0 0.5rem;
        width: 100%;
        font-size: 1.4rem;
        overflow: hidden;
        overflow-y: auto;
        text-overflow: clip;
        height: 20rem;
    }
`;

export const inputText = css`
    box-sizing: border-box;
    border: .1rem solid #000000;
    border-radius: 1rem;
    padding: 1rem;
    width: 100%;
    height: 8rem;
    outline: none;
    resize: vertical;
`;

export const footer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    

    & div {
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }


    & button {
        box-sizing: border-box;
        border-radius: .5rem;
        box-sizing: border-box;
        padding: 1rem 2rem;
        font-size: 2rem;
        font-weight: 600;
        background-color: #fafd2d;

        &:hover {
            box-shadow: 0 0 .6rem .1rem #000000;
        }

        &:active {
            background-color: #8d8f0e;
        }

        &:disabled {
            color: #bbbbbb;
            background-color: #fbfd6b;
        }
    }
`;