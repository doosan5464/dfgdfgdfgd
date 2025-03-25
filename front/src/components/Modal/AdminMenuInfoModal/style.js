import { css } from "@emotion/react";

export const modalcontainer = css`
    display: flex;
    flex-direction: column;
`;

export const modalhead = css`
    height: 10rem;
`;

export const modalbody = css`
    display: flex;
    height: 10rem;
`;

export const bodyleft = css`
    display: flex;
    flex-direction: column;
`;

export const bodyright = css`
    display: flex;
    flex-direction: column;

    & div {
        display: flex;
    }
`;

export const modalfooter = css`
    height: 10rem;
`;