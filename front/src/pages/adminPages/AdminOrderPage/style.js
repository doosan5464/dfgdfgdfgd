import { css } from "@emotion/react";

export const container = css`
    display: flex;
    flex-direction: column;
    margin: 1rem 1.5rem;
    width: 100%;
`;

export const datePicker = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & button {
        margin-right: 1rem;
        box-shadow: 0 0 .4rem .1rem #000000;
        box-sizing: border-box;
        border-radius: 1rem;
        border: none;
        padding: .5rem;
        height: fit-content;
        background-color: #017e07ff;
        cursor: pointer;

        &:hover {
            background-color: #017e07aa;
        }

        &:active {
            background-color: #017e0733;
        }
    }
`;



export const calandar = css`
    margin-right: 2rem;
    padding: 0.5rem;
    height: fit-content;

    & input {
        padding: 1rem 2rem;
        font-size: 1.5rem;
        font-weight: 600;
    }
`;

export const listcontainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    border-radius: 1rem;
    box-shadow: 0 0 0.3rem 0.2rem #00000022;
    overflow: hidden;

    & > div {
        display: flex;
        align-items: center;

    }

    & > div > span {
        box-sizing: border-box;
        padding: .8rem 1rem;
        width: 7rem;
        flex-grow: 1;
        white-space: nowrap;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & div .ordername {
        flex-grow: 3;
    }

    & div .status {
        position: relative;
        min-width: 7rem;
        overflow: unset;
        text-overflow: unset;

        & > span {
            display: none;
            position: absolute;
        }
    }
`;

export const listhead = css`
    box-sizing: border-box;
    margin-bottom: .2rem;
    border-bottom: .1rem solid #333333;
    font-size: 1.5rem;
    padding: 0.6rem 0;
    font-weight: bold;
    background-color: #004417;
    
    & * {
        color: #fafafa;
        cursor: default;
    }
`;

export const listbody = (status) => css`
    border-bottom: 0.1rem solid #dbdbdb;
    font-size: 1.5rem;
    cursor: 
        ${status === "PAID" ? "pointer" : "default"};

    &:hover {
        box-shadow: 
            ${status === "PAID" ? "inset 0 0 0.7rem 0.1rem #000000" : "none"};

        background-color: 
            ${status === "PAID" ? "#cccccc" : "#e8e8e8"};

        & > span > span {
            display: 
                ${status === "CANCELLED" ? "inline-block" : "none"};
            border-radius: 1rem;
            padding: 1rem 5rem;
            width: max-content;
            max-width: 55rem;
            white-space: normal;
            font-size: 1.6rem;
            color: #ffffff;
            background-color: #333333cc;
            transform: translate(-100%, -50%);
            top: 50%;
            left: -10%;
        }
    }
`;


export const statusbutton = (status) => css`
    border-radius: .7rem;
    border: none;
    padding: 0 1.5rem;
    height: 4rem;
    width: 9rem;
    color: #222222;
    background-color:
        ${status === "PAID" ? "#f1d21dff"
        : status === "FAILED" ? "#868686d2"
        : status === "CANCELLED" ? "#fd3f3f" : "#3fb7fd"};
    font-weight: 800;
`;



export const footer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2.5rem 0;
    width: 100%;
    
    & button {
        box-sizing: border-box;
        border-radius: .8rem;
        border: none;
        padding: .8rem 1.2rem;
        font-size: 1.5rem;
        cursor: pointer;
    }

    & button:nth-of-type(1),
    & button:nth-last-of-type(1) {
        margin: 0 1rem;
        background-color: #00000000;
    }

    & button:disabled {
        opacity: 0;
        cursor: default;
    }
`;

export const pageNum = (isSelect) => css`
    font-size: 1.5rem;
    font-weight: 600;
    /* color: ${isSelect ? "#ffffff" : "#000000"}; */
    background-color: ${isSelect ? "#bbbbbb" : "#ffffff00"};
`;