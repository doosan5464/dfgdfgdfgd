import { css } from "@emotion/react";

export const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const title = css`
    font-size: 5rem;
    margin-bottom: 3rem;
`;

export const table = css`
    width: 80%;
    border-collapse: collapse;
    text-align: center;
    font-size: 1.8rem;
    
    th, td {
        border: 1px solid #ddd;
        padding: 0.5rem;
    }

    th {
        background-color: #f4f4f4;
    }
`;

export const button = css`
    width: 40px;
    height: 40px;
    font-size: 1.8rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    cursor: pointer;
    
    &:hover {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
    }
`;
