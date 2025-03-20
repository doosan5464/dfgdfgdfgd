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
    }
`;

export const pay = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 80%;
    border-top: 0.2rem solid black;
    
    & > div {
        display: flex;
        width: 100%;
        font-size: 1.2rem;
        overflow-y: auto;

        &::-webkit-scrollbar {
            display: none;
        }
    }
`;

export const xUpDown = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 1rem;
    font-weight: 550;
    overflow-y: auto;
        
    & ::-webkit-scrollbar {
        display: none;
    }

    & > div {
        display: flex;
        align-items: center;
        gap: 0.1rem;
        margin: 1rem;
    }

    & > div > div {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
    }

    & button {
        font-size: 0.8rem;
        font-weight: 550;
        justify-content: center;
        align-items: center;
        margin-right: 1px;
    }
`;

export const footer = css`
    display: flex;
    height: 30%;
    width: 100%;
    border-top: solid black 1.6px;
    background-color:rgb(248, 210, 106);

    & > div {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 50%;
        justify-content: center;
        align-items: center;
        
        & > p {
            font-size: 1.5rem;
        }

        & > div {
            display: flex;
            width: 45%;
            height: 30%;
            margin: 1rem;
            border-radius: 1rem;
            justify-content: center;
            align-items: center;
            background-color: rgb(219, 68, 85);;
            color: white;
            
            
        }
    }
`;