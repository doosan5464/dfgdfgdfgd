/**@jsxImportSource @emotion/react */
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import * as s from './style';
import React, { useEffect, useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

function AdminMenuPage(props) {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [category, setCategory] = useState('all'); //카테고리 상태
    const page = parseInt(searchParams.get("page") || "1"); //페이지 번호
    const searchBoardList = useGetSearchBoardList({
        page,
        limi
    })


    const selectCategories = [
        {label: "전체", value: "all"},
        {label: "버거", value: "burger"},
        {label: "사이드", value: "side"},
        {label: "음료", value: "drink"},
        {label: "커피", value: "coffee"},
    ]

     // 카테고리 선택시 상태 업데이트
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    // 카테고리별 리스트 예시, 코드 구현 후 삭제
    const categoryLists = {
        burger: [
            { name: "불고기 버거", price: "5000원" },
            { name: "치즈버거", price: "5500원" },
            { name: "햄버거", price: "4500원" },
            { name: "더블 불고기 버거", price: "6500원" },
            { name: "베이컨 버거", price: "6000원" },
            { name: "새우 버거", price: "5800원" },
            { name: "치킨 버거", price: "5200원" },
            { name: "스파이시 버거", price: "5900원" },
            { name: "머쉬룸 버거", price: "6500원" },
            { name: "콰트로 치즈버거", price: "7000원" },
        ],
        side: [
            { name: "감자튀김", price: "2000원" },
            { name: "어니언 링", price: "2500원" },
            { name: "너겟", price: "2500원" },
            { name: "모짜렐라 스틱", price: "3000원" },
            { name: "치킨너겟", price: "3500원" },
            { name: "콜리플라워 튀김", price: "2800원" },
            { name: "매운 감자튀김", price: "2300원" },
            { name: "핫윙", price: "4000원" },
            { name: "튀긴 양파", price: "2200원" },
            { name: "고구마튀김", price: "2700원" },
        ],
        drink: [
            { name: "콜라", price: "1500원" },
            { name: "사이다", price: "1500원" },
            { name: "환타", price: "1500원" },
            { name: "레몬에이드", price: "2500원" },
            { name: "홍차", price: "2000원" },
            { name: "아이스티", price: "2200원" },
            { name: "자몽 에이드", price: "2700원" },
            { name: "딸기 우유", price: "2200원" },
            { name: "우유", price: "1500원" },
            { name: "탄산수", price: "1800원" },
        ],
        coffee: [
            { name: "아메리카노", price: "3000원" },
            { name: "라떼", price: "3500원" },
            { name: "카푸치노", price: "3700원" },
            { name: "카페모카", price: "4000원" },
            { name: "아이스 아메리카노", price: "3200원" },
            { name: "바닐라 라떼", price: "3800원" },
            { name: "카라멜 마키아토", price: "4000원" },
            { name: "헤이즐넛 라떼", price: "3800원" },
            { name: "더블 샷 아메리카노", price: "3500원" },
            { name: "아이ced 카푸치노", price: "3900원" },
        ],
    };



    return (
        <div css={s.container}>
            <div css={s.header}>
                <span>메뉴관리</span>
                <div>
                    <Select 
                        options={selectCategories}
                        styles={{
                            control: (style) => ({
                                ...style,
                                width: "11rem",
                                minHeight: "3rem",
                            }),
                            dropdownIndicator: (style) => ({
                                ...style,
                                padding: "0.3rem",
                            })
                        }}
                        value={category}
                        onChange={handleCategoryChange}
                        displayEmpty
                        fullWidth
                    >
                        {selectCategories.map((categoryOption) => (
                        <MenuItem key={categoryOption.value} value={categoryOption.value}>
                            {categoryOption.label}
                        </MenuItem>
                    ))}
                    </Select>
                </div>
            </div>

            <div>
                <h3>{categoryLists[category] ? `${category} 리스트` : "전체 리스트"}</h3>
                <ul>
                    {category === "all" 
                    ? Object.keys(categoryLists).map((key) => (
                        // "all"일 때 모든 카테고리 항목을 출력
                        categoryLists[key].map((item, index) => (
                            <li key={index}>
                                {item.name} - {item.price}
                            </li>
                        ))
                    )) 
                    : categoryLists[category]?.map((item, index) => (
                        // "all"이 아닐 경우, 선택된 카테고리만 출력
                        <li key={index}>
                            {item.name} - {item.price}
                        </li>
                    ))}
                </ul>
            </div>

            <div css={s.footer}>
                <button><GoChevronLeft /></button>
                -12345-
                <button><GoChevronRight /></button>
            </div>
        </div>
    );
}

export default AdminMenuPage;