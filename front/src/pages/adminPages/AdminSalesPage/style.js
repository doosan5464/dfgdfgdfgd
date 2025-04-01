import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 99;
    width: 100%;
    max-width: 140rem;
    height: 100%;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

export const header = css`
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const title = css`
    box-sizing: border-box;
    border-bottom: 2px solid #222;
    color: #222;
    width: 90%;
    height: 40%;
    font-size: 40px;
    font-weight: 700;
`;

export const salesCharts = css`
    margin-bottom: 10px;
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const toggleSwitch = css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

export const salesChartTitle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;

    & > label {
        display: flex;
        align-items: center;
        margin-top: 0.5rem;
        margin-right: 1rem;
        height: 100%;
    }
    & > div {
        margin-right: 1rem;
        height: 100%;
        font-size: 25px;
        font-weight: 600;
    }
`;

export const chartBox = css`
    box-sizing: border-box;
    background-color: white;
    border: 1px solid #dbdbdb;
    border-radius: 15px;
    width: 99%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 5px #bdc7ca;

    & * {
        box-sizing: border-box;
    }
`;

export const line = css`
    width: 100%;
    margin: 30px 0;
    box-sizing: border-box;
    border-top: 2px solid #22222255;
`;

export const menuList = css`
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 auto;
    gap: 2rem;
    & * {
        box-sizing: border-box;
    }
`;
