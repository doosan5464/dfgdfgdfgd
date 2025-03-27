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
	padding: 2rem;
	border-radius: 1.2rem;
	width: 90%;
	max-width: 100rem;
	max-height: 90vh;
	overflow-y: auto;
	box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.2);
	position: relative;
`;

export const closeButton = css`
	position: absolute;
	top: 1rem;
	right: 1rem;
	background: #e74c3c;
	color: white;
	border: none;
	border-radius: 50%;
	width: 2.8rem;
	height: 2.8rem;
	cursor: pointer;
	font-weight: bold;
	font-size: 1.6rem;

	&:hover {
		background: #c0392b;
	}
`;

export const topBar = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 1.6rem 0;

	h3 {
		margin: 0 0 0 2rem;
		font-size: 1.8rem;
	}

	& > select {
		margin-right: 2rem
	}
`;

export const categorySelect = css`
	padding: 0.6rem 1rem;
	font-size: 1.4rem;
	border-radius: 0.6rem;
	border: 1px solid #ccc;
`;

export const imageGrid = css`
	display: grid;
	grid-template-columns: repeat(5, 1fr); /* 가로 5칸 */
	grid-template-rows: repeat(4, auto);   /* 세로 4칸 */
	gap: 1.6rem;
	margin-top: 2rem;
`;

export const imageBox = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
`;

export const addImageBox = css`
	width: 70%;
	height: 70%;
	border: 2px dashed #ccc;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	svg {
		font-size: 2.5rem;
		color: #aaa;
	}

	p {
		margin-top: 0.5rem;
		font-size: 1.2rem;
		color: #666;
	}
`;

export const modalImage = css`
	width: 12rem;
	height: 12rem;
	object-fit: cover;
	border-radius: 0.8rem;
	transition: all 0.2s ease-in-out;
	border: 2px solid transparent;

	&:hover {
		transform: scale(1.05);
		border-color: #3498db;
	}
`;

export const selectedImage = css`
	border: 3px solid #e67e22;
`;

export const imageLabel = css`
	margin-top: 0.6rem;
	font-size: 1.4rem;
	color: #555;
	text-align: center;
`;

export const pagination = css`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 2.4rem;
	gap: 1.2rem;

	button {
		padding: 0.6rem 1.4rem;
		font-size: 1.4rem;
		font-weight: bold;
		border: none;
		border-radius: 0.6rem;
		background-color: #3498db;
		color: white;
		cursor: pointer;
		transition: background 0.2s ease;

		&:hover:enabled {
			background-color: #2980b9;
		}

		&:disabled {
			background-color: #bdc3c7;
			cursor: not-allowed;
		}
	}

	span {
		font-size: 1.6rem;
		font-weight: bold;
	}
`;
