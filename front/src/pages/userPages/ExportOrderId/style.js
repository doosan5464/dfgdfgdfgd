import { css } from "@emotion/react";

export const container = css`
    display: flex;
    width: 40rem;
    height: 71.1rem;
    border: 0.2rem solid black;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 2rem;
    font-weight: 550;

    & > div {
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;

        & > div {
            display: flex;
            width: 40%;
            height: 6rem;
            background-color: #ffd154;
            border-radius: 1rem;
            justify-content: center;
            align-items: center;
            font-size: 2rem;
            margin: 0 2rem 0 2rem;
        }
    }
`;

export const head = css`
    font-size: 5rem;
`

export const num = css`
    font-size: 10rem;
    color: #e22828;
`