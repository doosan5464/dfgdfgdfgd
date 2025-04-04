import { css } from "@emotion/react";

export const container = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border: 1px solid #dbdbdb;
`;

export const smImage = css`
    display: flex;
    width: 100%;
    height: 45%;
    overflow: hidden;
    justify-content: center;
    position: relative;
`;

export const imageStyle = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 1s ease-in-out;  /* 슬라이딩 효과를 부드럽게 적용 */
`;

export const smChoice = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    font-size: 1rem;
    margin-top: 2rem;
`;

export const smLanguage = css`
    display: flex;
    font-size: 2rem;
    width: 100%;
    height: 7rem;
    justify-content: space-evenly;
    margin-top: 2rem;
    margin-bottom: 6rem;
    
    & > span {
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 0.6rem 0.1rem #ffa600e1;
        width: 14rem;
        height: 10rem;
        font-size: 2rem;
        font-weight: 800;
        border-radius: 1rem;

        &:hover {
            box-shadow: 0 0 0.6rem 0.1rem #ffa600e1;
        }
    }

`;

export const selectedLanguage = css`
    background-color:#ffd154;
`;

export const smHow = css`
    position: relative;
    display: flex;
    font-size: 2rem;
    width: 100%;
    height: 15rem;
    justify-content: space-evenly;
    margin-top: 2rem;

    & > span {
        display: flex;

        border-radius: 1rem;
        width: 17rem;
        height: 17rem;
        box-shadow: 0 0 0.6rem 0.1rem #ffa600e1;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;

        & > img {
            display: flex;
            width: 80%;
            height: 80%;
        }
    }
`;