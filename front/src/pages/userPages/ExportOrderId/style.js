import { css } from "@emotion/react";

export const head = css`
    display: flex;
    justify-content: center;
    font-size: 5rem;
    margin-top: 10rem;
`

export const num = css`
    display: flex;
    justify-content: center;
    font-size: 10rem;
    color: #e22828;
    margin-top: 5rem;
`

export const ask = css`
    display: flex;
    justify-content: center;
    margin-top: 15rem;
    font-size: 4rem;
`;

export const twice = css`
    display: flex;
    justify-content: space-around;
    margin-top: 10rem;
    font-size: 4rem;

    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1rem;
        background-color: #1c7a2c;
        width: 18rem;
        height: 8rem;
    }
`;