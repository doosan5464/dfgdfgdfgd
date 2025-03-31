import { css } from "@emotion/react";

export const container = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 2rem 0 2rem 0;
    height: 100%;
    width: 100%;
`;

export const head = css`
    display: flex;
    margin-left: 2rem;
    font-size: 2.2rem;

    & div {
        margin: 0 8rem 0 0;
        width: 100%;
    }

    & div div:nth-of-type(1) {
        border-bottom: .2rem dashed #00000044;
        padding: 0 .5rem .5rem .5rem;
        font-weight: 500;
    }

    & div div:nth-of-type(2) {
        padding: .5rem .5rem 0 .5rem;
    }
`;

export const body = css`
    display: flex;
    margin: 5rem 10rem 0 0;
    flex-grow: 1;

    & div {
        margin: 0 10rem 0 0;
        padding: 0 .5rem .5rem 1rem;
        width: 100%;
    }

    & div div:nth-of-type(1) {
        border-bottom: .2rem dashed #00000044;
        font-size: 2.2rem;
        font-weight: 500;
    }

    & div div:nth-of-type(2) {
        padding: 1.2rem 0.5rem 0 0.5rem;
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
        padding: 1rem 2rem;
        font-size: 2rem;
        font-weight: 600;
        background-color: #fafd2d;

        &:hover {
            background-color: #cccf22;
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