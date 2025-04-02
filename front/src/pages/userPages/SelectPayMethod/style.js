import { css } from "@emotion/react";

export const header = css`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 1rem 3rem;
    width: 100%;
    height: 10rem;
    border-bottom: 0.1rem solid #dbdbdb;
    border-bottom-left-radius: 0.8rem;
    border-bottom-right-radius: 0.8rem;
    box-shadow: 0 0.1rem 0.3rem 0.1rem #00000017;
    margin-bottom: 2rem;
    

    & > img {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80%;
        width: auto;
    }

    & > p {
        display: flex;
        height: 100%;
        width: 20%;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        font-weight: 550;
        cursor: default;
        margin: 0; 
    }
`;

export const main = css`
    display: flex;
    height: 80%;
    width: 100%;
`;

export const method = css`
    display: flex;
    width: 100%;
    height: 1rem;
    flex-wrap: wrap;
    justify-content: flex-start;

    & > div {
        display: flex;
        height: 14.2rem;
        width: 14.2rem;
        background-color: white;
        border-radius: 0.4rem;
        box-shadow: 0 0 0.3rem 0.1rem #00000017;
        margin: 1rem;
        align-items: center;

        &:hover {
            box-shadow: 0 0 0.6rem 0.1rem #4296e5e1;
        }
        
        & > img {
            display: flex;
            height: 100%;
            width: 100%;
        }

        & > div {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;
        }
    }
`;

export const foot = css`
    display: flex;
    justify-content: center;
`;

export const footer = css`
    display: flex;
    width: 30%;
    height: 7rem;
    margin: 1rem;
    border-radius: 1rem;
    justify-content: center;
    align-items: center;
    background-color: #1c7a2c;
    font-size: 1.6rem;
    color: white;
`;