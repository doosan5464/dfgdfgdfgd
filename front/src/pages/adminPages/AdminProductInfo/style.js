/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const container = css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2rem;
    gap: 2rem;
`;

export const leftPanel = css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const imageBox = css`
    width: 25rem;
    height: 25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    font-weight: bold;
    overflow: hidden;
    background-color: #fff;
    
    img {
        width: 100%;
        height: auto;
        object-fit: contain;
    }
    `;

export const dropdown = css`
    width: 25rem;
    padding: 0.6rem;
    font-size: 1.4rem;
    border: 1px solid #000;
`;

export const inputGroup = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    `;

export const label = css`
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
`;

export const input = css`
    padding: 0.6rem 1rem;
    font-size: 1.6rem;
    border: 1px solid #000;
    width: 20rem;
`;

export const buttonGroup = css`
    display: flex;
    gap: 1rem;
`;

export const button = css`
    width: 12rem;
    padding: 0.8rem;
    font-size: 1.6rem;
    border: 1px solid #000;
    background-color: #fff;
    cursor: pointer;
`;

export const rightPanel = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const table = css`
    width: 100%;
    border-collapse: collapse;
`;

export const caption = css`
    font-size: 1.6rem;
    font-weight: bold;
    margin: 1rem 0;
`;

export const th = css`
    border: 1px solid #000;
    padding: 0.6rem;
    background-color: #f2f2f2;
    text-align: center;
`;

export const td = css`
    border: 1px solid #000;
    padding: 0.6rem;
    text-align: center;
`;

export const evenRow = css`
    background-color: #f8f8f8;
`;
