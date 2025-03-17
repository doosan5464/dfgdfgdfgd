/**@jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import BurgerMenu from './menu/BurgerMenu';
import DrinkMenu from './menu/DrinkMenu';
// import HappySnackMenu from './menu/HappySnackMenu';
import RecommendMenu from './menu/RecommendMenu';
import SideMenu from './menu/SideMenu';
import * as s from './style';
import React, { useState, useEffect } from 'react';
import CoffeeMenu from './menu/CoffeeMenu';
import CallManagerModal from '../../../components/Modal/CallManagerModal/CallManagerModal';
import MenuDetailModal from '../../../components/Modal/MenuDetailModal/MenuDetailModal';
import DessertMenu from './menu/DessertMenu';
import { addedCart } from '../../../atoms/addedCart/addedCart';
import { useRecoilState } from 'recoil';


function OrderPage(props) {
    const navi = useNavigate();

    // 선택된 카테고리 상태 추가
    const [selectedCategory, setSelectedCategory] = useState("추천메뉴");

    // 장바구니
    const [addedCartState] = useRecoilState(addedCart);

    const handleMenuCategoryOnClick = (category) => {
        if (selectedCategory !== category) {
            setSelectedCategory(category);
        }
    }
    
    const handleBackMenuOnClick = () => {
        navi("/menu");
    }

    // 선택된 메뉴 정보를 저장할 상태
    const [selectedMenu, setSelectedMenu] = useState(null);

    const handleMenuItemClick = (menu) => {
        setSelectedMenu(menu); // 메뉴 클릭 시 모달에 정보를 전달
    }

    const handleCloseMenuDetailModal = () => {
        setSelectedMenu(null); // 모달 닫기
    }







    return (
        <div css={s.container}>
            <header css={s.logoAnd2button}>
                <div css={s.mcdonaldLogo}>
                    <img src="https://pngimg.com/uploads/mcdonalds/mcdonalds_PNG17.png" alt="" />
                </div>
                <div css={s.buttons}>
                    <div onClick={handleBackMenuOnClick}>처음으로</div>
                    <CallManagerModal />
                </div>
            </header>

            <main css={s.body}>
                <div css={s.category}>
                    <div onClick={() => handleMenuCategoryOnClick("추천메뉴")}>🔥 추천메뉴</div>
                    <div onClick={() => handleMenuCategoryOnClick("버거")}>🍔 버거</div>
                    {/* <div onClick={() => handleMenuCategoryOnClick("해피스낵")}>🍟 해피스낵</div> */}
                    <div onClick={() => handleMenuCategoryOnClick("사이드")}>🍗 사이드</div>
                    <div onClick={() => handleMenuCategoryOnClick("음료")}>🥤 음료</div>
                    <div onClick={() => handleMenuCategoryOnClick("커피")}>☕ 커피</div>
                    <div onClick={() => handleMenuCategoryOnClick("디저트")}>🍦 디저트</div>
                    <div>테스트 2</div>
                    <div>테스트 3</div>
                </div>
                <div css={s.menu}>
                    {/* 선택된 카테고리에 따라 메뉴를 렌더링하고, 각 메뉴 항목 클릭 시 handleMenuItemClick 호출 */}
                    {selectedCategory === "추천메뉴" && <RecommendMenu onMenuItemClick={handleMenuItemClick} />}
                    {selectedCategory === "버거" && <BurgerMenu onMenuItemClick={handleMenuItemClick} />}
                    {/* {selectedCategory === "해피스낵" && <HappySnackMenu onMenuItemClick={handleMenuItemClick} />} */}
                    {selectedCategory === "사이드" && <SideMenu onMenuItemClick={handleMenuItemClick} />}
                    {selectedCategory === "음료" && <DrinkMenu onMenuItemClick={handleMenuItemClick} />}
                    {selectedCategory === "커피" && <CoffeeMenu onMenuItemClick={handleMenuItemClick} />}
                    {selectedCategory === "디저트" && <DessertMenu onMenuItemClick={handleMenuItemClick} />}
                </div>
            </main>

            <footer css={s.pay}>
                <div>
                    <h2>장바구니</h2>
                    <div>
                        {addedCartState.length > 0 ? (
                            <ul>
                                {addedCartState.map((item, index) => (
                                    <li key={index}>{item.detailMenu} - {item.detailPrice}원</li> // 아이템 이름과 가격 표시
                                ))}
                            </ul>
                        ) : (
                            <p>장바구니에 아무것도 없습니다.</p>
                        )}
                    </div>
                </div>
                <div>
                    
                </div>
            </footer>

            {/* 선택된 메뉴가 있을 경우 모달을 띄운다 */}
            {selectedMenu && <MenuDetailModal menu={selectedMenu} onClose={handleCloseMenuDetailModal} />}
        </div>
    );
}

export default OrderPage;