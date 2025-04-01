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
        //border-bottom: .3rem dashed #00000055;
        font-size: 4rem;
        font-weight: 600;
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
            cursor: pointer;

            &:hover {
                background-color: #b47312ff;
            }

            &:active {
                background-color: #995c007c;
            }
        }
    }
`;

export const datePicker = css`
    display: flex;
    align-items: center;
`

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
        text-align: center;
    }

    & div .orderid {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & div .ordername {
        flex-grow: 3;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & div .totalamount {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & div .time {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & div .status {
        position: relative;

        & > span {
            display: none;
            position: absolute;
            border-radius: 1rem;
            width: max-content;
            font-size: 1.6rem;
            background-color: #ffffffee;
            transform: translate(-100%, -50%);
            top: 50%;
            left: -10%;
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

export const listbody = css`
    border-bottom: 0.1rem solid #dbdbdb;
    font-size: 1.5rem;
    cursor: default;
`;


export const cancelreasons = (status) => css`
    & > button {
        width: 9rem;
    }
    & button:hover + span {
        display: 
            ${status === "CANCELLED" ? "block" : "none"};
    }
`;


export const statusbutton = (status) => css`
    border-radius: .7rem;
    border: none;
    padding: 0 1.5rem;
    height: 4rem;
    width: fit-content;
    color: #222222;
    background-color:
        ${status === "PAID" ? "#f1d21dff"
        : status === "FAILED" ? "#868686d2"
        : status === "CANCELLED" ? "#fd3f3f" : "#3fb7fd"};
    font-weight: 800;
    
    &:hover{
        background-color:
            ${status === "PAID" ? "#b39b17ff" : "yourDefaultColor"};
        cursor:
            ${status === "PAID" ? "pointer" : "default"};
    }

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