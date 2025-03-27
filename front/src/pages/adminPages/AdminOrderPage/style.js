import { css } from "@emotion/react";

export const container = css`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const upside = css`
    display: flex;
    flex-direction: column;
`;

export const midside = css`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const listcontainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;

    & div {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin: 0.5rem 2rem;
    }

    & div span {
        padding: 0 2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

    }

    & .orderid {
        width: 5rem;
    }

    & .mid {
        width: 5rem;
    }

    & .ordername {
        width: 15rem;
    }

    & .totalamount {
        width: 5rem;
    }

    & .status {
        width: 8rem;
    }

`;

export const listhead = css`




`;