import { css } from "@emotion/react";

export const container = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    width: 100%;

    & > h1 {
        font-size: 2.5rem;
        cursor: default;
    }

`;