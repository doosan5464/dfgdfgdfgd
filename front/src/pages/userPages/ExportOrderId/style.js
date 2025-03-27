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
            justify-content: center;
            align-items: center;
            width: 10rem;
            height: 5rem;
            background-color: red;
            margin: 0 2rem 0 2rem;
            border-radius: 1rem;
        }
    }
`;