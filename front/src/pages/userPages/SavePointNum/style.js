import { css } from "@emotion/react";

export const background = css`
    display: flex;
    width: 40rem;
    height: 71.1rem;
    border: 0.2rem solid black;
    background-color: #EEEEEE;
    justify-content: center;
    align-items: center;
`;

export const container = css`
    display: flex;
    flex-direction: column;
    width: 30rem;
    padding: 2rem;
    border-radius: 1rem;
    background-color: white;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    align-items: center;

    & > p {
        font-size: 2rem;
        font-weight: 550;
    }
`;

export const input = css`
    width: 80%;
    height: 3rem;
    font-size: 2rem;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 4rem;
`;

export const keypad = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-bottom: 1rem;
`;

export const button = css`
    width: 5rem;
    height: 5rem;
    font-size: 1.5rem;
    font-weight: 550;
    background-color: white;
    border: 1px solid #ffd154;
    border-radius: 0.5rem;
    cursor: pointer;
    &:hover {
        background-color: #ffe08a;
    }
`;

export const footer = css`
    width: 60%;
    height: 4rem;
    font-size: 1.5rem;
    font-weight: 550;
    background-color: #ffd154;
    border-radius: 0.5rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-top: 2rem;
    margin-bottom: 2rem;

    &:hover {
        background-color: #ffcc00;
    }
`;
