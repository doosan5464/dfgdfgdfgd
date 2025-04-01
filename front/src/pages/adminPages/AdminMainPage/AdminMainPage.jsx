/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import * as s from './style';
import React, { useEffect } from 'react';

function AdminMainPage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("AccessToken")) {
            navigate("/admin/login");
        }
    }, [navigate]);

    const handleCategoryClick = (category) => {
        const routes = {
            menu: '/admin/main/menu',
            product: '/admin/main/product',
            option: '/admin/main/option',
            sales: '/admin/main/sale',
            order: '/admin/main/order',
            info: '/admin/main/mypage'
        };
        navigate(routes[category]);
    };

    return (
        <div css={s.layout}>
            <div css={s.header}>
                <h1>McDonald Admin</h1>
                <p>관리자 모드</p>
            </div>

            <div css={s.mainContent}>
                <div css={s.categorySection}>
                    {['menu', 'product', 'option', 'sales', 'order', 'info'].map(category => (
                        <div key={category} css={s.categoryBox} onClick={() => handleCategoryClick(category)}>
                            <h3>{category === 'info' ? '내 정보' : `${category} 관리`}</h3>
                        </div>
                    ))}
                </div>

                {/* <div css={s.sectionContainer}>
                    <div css={s.noticeSection}>
                        <h2>공지사항</h2>
                        <ul>
                            <li>2025년 3월 24일, 새 메뉴 출시</li>
                            <li>2025년 3월 20일, 사이트 점검 예정</li>
                            <li>2025년 3월 15일, 가격 인상 안내</li>
                        </ul>
                    </div>

                    <div css={s.newsSection}>
                        <h2>새 소식</h2>
                        <ul>
                            <li>새로운 할인 이벤트 시작</li>
                            <li>모바일 앱 업데이트 완료</li>
                            <li>고객 만족도 조사 시작</li>
                        </ul>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default AdminMainPage;
