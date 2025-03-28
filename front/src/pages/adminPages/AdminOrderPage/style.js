import { css } from "@emotion/react";

export const container = css`
    display: flex;
    flex-direction: column;
    margin: 1rem 1.5rem;
    width: 100%;
`;

export const upside = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & span {
        margin: 1rem;
        padding: 1rem 1rem 1.5rem 1rem;
        border-bottom: .3rem dashed #00000055;
        font-size: 3rem;
        font-weight: 500;
    }

    & div {
        display: flex;
        align-items: center;
        
        & button {
            margin-right: 1rem;
            box-sizing: border-box;
            border-radius: 1rem;
            border: .3rem solid #444444;
            padding: .5rem;
            height: fit-content;
            background-color: #fda41eff;
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

    & div {
        display: flex;
        align-items: center;

    }

    & div span {
        box-sizing: border-box;
        padding: .5rem 2rem;
        width: 7rem;
        flex-grow: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
    }

    & div .ordername {
        flex-grow: 3;
    }
`;

export const listhead = css`
    margin-bottom: .2rem;
    border-bottom: .1rem solid #333333;
    padding: .2rem 0;
    font-size: 1.5rem;
    font-weight: bold;
`;

export const listbody = css`
    border-bottom: 0.1rem dashed #333333;
    font-size: 1.5rem;
`;


export const statusbutton = (status) => css`
    border-radius: .7rem;
    border: none;
    padding: 0 1.5rem;
    height: 4rem;
    width: fit-content;
    color: #222222;
    background-color:
        ${status === "PAID" ? "#dfc11cff"
        : status === "FAILED" ? "#868686"
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