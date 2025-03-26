import { css } from "@emotion/react";

export const container = css`
    display: flex;
    flex-direction: column;
    width: 40rem;
    height: 71.1rem;
    border: 0.2rem solid black;
    background-color: #EEEEEE;
    justify-content: center;
    align-items: center;
`;

export const header = css`
    display: flex;
    width: 100%;
    height: 10rem;
    

    & > img {
        display: flex;
        height: 100%;
        width: auto;
        background-color: rebeccapurple;
    }

    & > p {
        display: flex;
        height: 100%;
        width: 20%;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        font-weight: 550;
        margin: 0; 
        background-color: red;
    }
`;