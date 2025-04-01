import { css } from "@emotion/react";

export const mainContainer = css`
    display: flex;
    justify-content: center; 
    align-items: center; 
    box-sizing: border-box;
    height: 100%; 
    width: 100%;
    margin: 0;
    padding: 5rem;
`;

export const mainCon = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;

    & > div {
        width: 28rem;
        height: 28rem;
        background-color: #47a8af;
        border-radius: 3rem;
        cursor: pointer;
        font-size: 4.5rem;
        text-align: center;
        
        &:hover {
            text-decoration: underline;
        }

        & > svg {
            margin-top: 8rem;
        }

        & > h5 {
            margin-top: 1rem;
        }
    }
    
    & > div:nth-of-type(2) {
        margin-right: 6rem;
        margin-left: 6rem;
        background-color: #a837aa;
    }

    & > div:nth-of-type(3) {
        background-color: #42df34;
    }
`;