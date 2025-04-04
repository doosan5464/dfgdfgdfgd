/** @jsxImportSource @emotion/react */
import { Link, useNavigate } from 'react-router-dom';
import * as s from './style';
import React, { useEffect, useState } from 'react';  // useState를 추가합니다.
import { BiLogOut } from 'react-icons/bi';
import { setTokenLocalStorage } from '../../../configs/axiosConfig';
import { useQueryClient } from '@tanstack/react-query';

function MainSidebar(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [activeButton, setActiveButton] = useState('');  // 상태 추가: 클릭된 버튼을 관리합니다.

    // 1. 로그인 상태 확인: accessToken이 없으면 로그인 페이지로 리다이렉트
    useEffect(() => {
        const token = localStorage.getItem("AccessToken");
        if (!token) {
            navigate("/admin/login");  // 토큰이 없으면 로그인 페이지로 이동
        }
        // https://cafe.daum.net/studyitworld
        // http://localhost:5173/admin/main
        const pathSegment = location.pathname.split('/')[3]; // 경로에서 슬러시 기준으로 해당 순서의 값 저장
        setActiveButton(pathSegment);  // 해당 경로의 클릭된 버튼을 상태로 설정
    }, [navigate]);

    const handleButtonClick = (buttonName) => {
        // 페이지 이동
        if (buttonName === 'menu') {
            navigate('/admin/main/menu'); 
        }
        if (buttonName === 'product') {
            navigate('/admin/main/product');  
        }
        if (buttonName === 'option') {
            navigate('/admin/main/option');  
        }
        if (buttonName === 'sale') {
            navigate('/admin/main/sale');  
        }
        if (buttonName === 'order') {
            navigate('/admin/main/order');  
        }
        if (buttonName === 'mypage') {
            navigate('/admin/main/mypage');  
        }
        
    };

    const handleLogoutButtonOnClick = async () => {
        setTokenLocalStorage("AccessToken", null);
        await queryClient.invalidateQueries({ queryKey: ["userMeQuery"] });
        navigate("/admin/login");
    };

    return (
        <div css={s.container}>
            <div css={s.header} >
                <Link to="/admin/main" css={s.headerLink} onClick={() => setActiveButton('')}>
                <p>관리자 모드</p>
                </Link>
            </div>
            <div css={s.body}>
                <button 
                    css={s.menuButton(activeButton === "menu")}  // 클릭된 버튼에 activeButton 스타일 적용
                    onClick={() => handleButtonClick('menu')}
                >
                    메뉴 관리
                </button>
                <button 
                    css={s.menuButton(activeButton === "product")}  // 클릭된 버튼에 activeButton 스타일 적용
                    onClick={() => handleButtonClick('product')}
                >
                    제품 관리
                </button>
                <button 
                    css={s.menuButton(activeButton === "sale")}  // 클릭된 버튼에 activeButton 스타일 적용
                    onClick={() => handleButtonClick('sale')}
                >
                    매출 관리
                </button>
                <button 
                    css={s.menuButton(activeButton === "order")}  // 클릭된 버튼에 activeButton 스타일 적용
                    onClick={() => handleButtonClick('order')}
                >
                    주문 관리
                </button>
                <button 
                    css={s.menuButton(activeButton === "mypage")}  // 클릭된 버튼에 activeButton 스타일 적용
                    onClick={() => handleButtonClick('mypage')}
                >
                    내 정보
                </button>
            </div>
            <div css={s.footer}>
                    <button 
                        css={s.menuButton(false)} 
                        onClick={handleLogoutButtonOnClick}
                    >
                        <BiLogOut />로그아웃
                    </button>
                </div>
        </div>
    );
}

export default MainSidebar;
