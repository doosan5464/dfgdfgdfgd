import { css } from "@emotion/react";

export const container = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 2rem;
    box-sizing: border-box;
`;

export const leftPanel = css`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const imageBox = css`
    width: 25rem;
    height: 20rem;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    overflow: hidden;
    border-radius: 1rem;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const dropdown = css`
    width: 100%;
    height: 4.5rem;
    margin-bottom: 2rem;
    padding: 0.5rem;
    font-size: 1.4rem;
`;

export const inputGroup = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
`;

export const label = css`
    margin-bottom: 0.5rem;
    font-size: 1.45rem;
    font-weight: bold;
`;

export const textarea = css`
    width: 100%;
    height: 8rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.4rem;
    box-sizing: border-box;
    resize: none;
    font-size: 1.4rem;
    background-color: #f9f9f9;
    &:disabled {
        background-color: #eee;
    }
`;

export const input = css`
    box-sizing: border-box;
    width: 100%;
    height: 3rem;
    padding: 0 1rem;
    font-size: 1.4rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
`;

export const buttonGroup = css`
    display: flex;
    gap: 1rem;
`;

export const button = css`
    width: 20rem;
    height: 4rem;
    background-color: #ffcc00;
    border: none;
    border-radius: 0.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background-color: #ffdd33;
    }
`;

export const rightPanel = css`
    width: 65%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const table = css`
    width: 100%;
    border-collapse: collapse;
    text-align: center;
`;

export const caption = css`
    margin-bottom: 1.6rem;
    font-weight: bold;
    font-size: 1.6rem;
`;

export const th = css`
    border: 1px solid #ccc;
    padding: 0.75rem;
    background-color: #f5f5f5;
    height: 5rem;
    font-size: 1.4rem;
    `;

export const td = css`
    border: 1px solid #ccc;
    padding: 0.75rem;
    height: 4.5rem;
    font-size: 1.4rem;
`;

export const evenRow = css`
    background-color: #f9f9f9;
`;
