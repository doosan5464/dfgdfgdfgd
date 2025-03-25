import { css } from "@emotion/react";

export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const modalContent = css`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 80%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  position: relative;
`;

export const closeButton = css`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 20px;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
`;

export const imageGrid = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  margin-top: 20px;
`;

export const modalImage = css`
  width: 100%;
  height: 100px;
  object-fit: contain;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #666;
    transform: scale(1.05);
  }
`;

export const selectedImage = css`
  border-color: #ff5f00;
  box-shadow: 0 0 0 3px rgba(255, 95, 0, 0.5);
`;

export const pagination = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  gap: 15px;

  button {
    padding: 6px 14px;
    font-size: 14px;
    font-weight: bold;
    border: none;
    background-color: #333;
    color: white;
    border-radius: 6px;
    cursor: pointer;

    &:disabled {
      background-color: #bbb;
      cursor: not-allowed;
    }
  }

  span {
    font-weight: bold;
    font-size: 14px;
  }
`;
