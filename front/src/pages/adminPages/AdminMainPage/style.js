import { css } from "@emotion/react";

// 레이아웃 전체 스타일
export const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 2rem;
    padding-top: 4rem;
    white-space: nowrap;
`;

// 헤더 스타일
export const header = css`
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2rem;
    font-weight: bold;
`;

// 메인 콘텐츠 스타일
export const mainContent = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

// 카테고리 섹션 스타일
export const categorySection = css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
    width: 60%;
    margin-bottom: 2rem;
`;

// 카테고리 박스 스타일
export const categoryBox = css`
    background-color: #fff;
    padding: 2rem;
    text-align: center;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    font-size: 1.6rem;
    font-weight: bold;

    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
`;

// 공지사항과 새 소식을 나란히 배열
export const sectionContainer = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    gap: 2rem;
    margin-bottom: 2rem;
`;

// 공지사항 및 새 소식 박스 스타일 통일
export const noticeSection = css`
    flex: 1;
    padding: 2rem;
    background-color: #f8f8f8;
    border-radius: 0.5rem;
    font-size: 1.6rem;
`;

export const newsSection = css`
    flex: 1;
    padding: 2rem;
    background-color: #f8f8f8;
    border-radius: 0.5rem;
    font-size: 1.6rem;
`;

// 공지사항과 새 소식의 제목 스타일
export const h2 = css`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
`;

// 리스트 스타일
export const ul = css`
    list-style-type: none;
    padding: 0;
`;

// 리스트 항목 스타일
export const li = css`
    font-size: 1.6rem;
    margin: 0.7rem 0;
`;
