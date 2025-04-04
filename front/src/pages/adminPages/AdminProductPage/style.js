import { css } from "@emotion/react";

export const mainContainer = css`
    display: flex;
    justify-content: center; 
    align-items: center; 
    box-sizing: border-box;
    margin: 0;
    padding: 5rem;
`;

export const mainCon = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;

    & > div {
        width: 35rem;
        height: 60rem;
        border-radius: 3rem;
        cursor: pointer;
    }  
`;

export const content = css`
    width: 100%;
    height: 100%;
    margin: 0 3.5rem;
    border-radius: 2rem;
    overflow: hidden;
    
    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
    
    &:hover {
        transition: transform 0.4s ease-in-out;
        transform: scale(1.1);
    }
`;