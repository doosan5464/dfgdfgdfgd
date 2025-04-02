import { css } from "@emotion/react";

export const modalOverlay = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const modalContent = css`
    position: fixed;
    display: flex;
    padding: 2rem;
    border-radius: 1rem;
    background: white;

    & > div {
        display: flex;
        flex-direction: column;
        max-width: 40rem;
    }

`;

export const modalBasich3 = css`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin: 0;
    padding: 1rem 0 3rem 4rem;
    width: 100%;

    font-size: 2rem;
    cursor: default;

    & button {
        margin: 0 0 1.2rem 2.8rem;
        border: none;
        border-radius: 100%;
        box-sizing: border-box;
        padding: 1rem;
        font-size: 1.4rem;
        font-weight: 700;
        color: #f5f5f5;
        background-color: #1da840;

        &:hover {
            box-shadow: 0 0 .5rem .1rem #078827;
            background-color: #078827;
        }
    }
`;

export const temp = css`
    display: flex;
    justify-content: space-evenly;
`;

export const modalBuguerSetImage = (isSeleted) => css`
    display: flex;
    width: 15rem; 
    height: 15rem;
    &:nth-of-type(2) {
        margin-left: 2rem;
    }

    & > label {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        border-radius: 0.4rem;
        box-shadow: ${isSeleted ? "0 0 0.3rem 0.2rem #ffa600e1" : "0 0 0.3rem 0.1rem #00000017"};
        overflow: hidden;

        font-size: 11px;
        font-weight: 600;
        cursor: pointer;

        &:hover {
            box-shadow: 0 0 0.6rem 0.1rem #ffa600e1;
        }

        & > input {
            display: none;
        }

        & > img {
            width: 100%;
            max-width: 30rem;
            bottom: 30px;
        }

        & > div {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            & > p {
                margin: 0;
            }
        }
    }
`;

export const mapParent = css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap; // !!!
    overflow-y: auto;
`;

export const childrenDiv = css`
    display: flex;
    justify-content: space-evenly;
    
`;
export const modalSideSetImage = (isSeleted) => css`
    display: flex;
    width: 11rem;
    height: 11rem ;
    margin: 1rem;

    & > label {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 7rem;
        flex-grow: 1;
        border-radius: 0.4rem;
        box-shadow: ${isSeleted ? "0 0 0.3rem 0.2rem #ffa600e1" : "0 0 0.3rem 0.1rem #00000017"};
        overflow: hidden;

        font-size: 11px;
        font-weight: 600;
        cursor: pointer;

        &:hover {
            box-shadow: 0 0 0.6rem 0.1rem #ffa600e1;
        }

        & > input {
            display: none;
        }

        & > img {
            width: 100%;
            bottom: 30px;
        }

        & > div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            & > p {
                margin: 0;
                text-align: center;
            }
        }
    }
`;

export const nextAndClose = css`
    display: flex;
    justify-content: center;
    margin: 30px 10px 10px 10px;

    & > span {
        display: flex;
        justify-content: center;
        align-items: center;
        text-justify: center;
        text-align: center;
        font-size: 1.6rem;
        font-weight: 500;
        width: 13rem;
        height: 4rem;
        border-radius: 10px;
        color: white;
        background-color: #1c7a2c;
        cursor: pointer;

        :nth-last-of-type(1) {
            margin-left: 2rem;
            background-color: #EE4545;
        }
    }
`;

export const cartParent = css`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

export const cart = css`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #EE4545;
    width: 40%;
    height: 4rem;
    border-radius: 10px;
    margin-bottom: 5px;
    color: white;
    border: none;
    font-size: 2rem;
    font-weight: 500;
`;

export const closeTemp = css`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #5CC6F3;
    width: 40%;
    height: 4rem;
    border-radius: 10px;
    margin-bottom: 5px;
    color: white;
    border: none;
    font-size: 2rem;
    font-weight: 500;
`;