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
    margin-top: 2rem;
    display: flex;
    width: 85%;
    height: 90%;
    border: 0.1rem solid black;
    background-color: white;
    
    
    & > div {
        display: flex;
        height: 10rem;
        width: 10rem;
        margin: 1.2rem;
        box-shadow: 0.2rem 0.2rem 0.2rem rgba(0,0,0,0.25); 
            
        & > img {
            display: flex;
            height: 100%;
            width: 100%;
        }
    }
`;

export const footer = css`
    display: flex;
    width: 100%;
    height: 15%;
    justify-content: space-evenly;
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
    }
`;