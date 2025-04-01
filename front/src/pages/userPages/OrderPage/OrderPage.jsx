import React, { useEffect, useState } from 'react';
/**@jsxImportSource @emotion/react */
import * as s from './style';
import CallManagerModal from '../../../components/Modal/CallManagerModal/CallManagerModal';
import MenuDetailModal from '../../../components/Modal/MenuDetailModal/MenuDetailModal';
import MenuModifyModal from '../../../components/Modal/MenuModifyModal/MenuModifyModal';
import { addedCart } from '../../../atoms/addedCart/addedCart';
import { useRecoilState } from 'recoil';
import MenuCategory from './menu/MenuCategory';
import { disabledCategoriesState } from '../../../atoms/disabledCategories/disabledCategories';
import { orderedCategoriesState } from '../../../atoms/orderedCategoriesState/orderedCategoriesState';
import { useNavigate } from 'react-router-dom';

function OrderPage(props) {
    const navi = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [addedCartState, setAddedCartState] = useRecoilState(addedCart);
    const [editingItem, setEditingItem] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);

    const [categories] = useRecoilState(orderedCategoriesState); // 기존 useState 제거
    const [disabledCategories] = useRecoilState(disabledCategoriesState); // atom 사용

    useEffect(() => {
        if (categories.length > 0) {
            // 카테고리 로드 후 첫 번째 활성화된 카테고리로 초기값 설정
            const firstAvailableCategory = categories.find(category => !disabledCategories.includes(category));
            setSelectedCategory(firstAvailableCategory || categories[0]);
        }
    }, [categories, disabledCategories]);

    const handleMenuCategoryOnClick = (category) => {
        if (selectedCategory !== category) {
            setSelectedCategory(category);
        }
    };

    const handleBackMenuOnClick = () => {
        navi("/menu");
    };

    const handlePaymentOnClick = () => {
        navi("/prePayment");
    };

    const handleMenuItemClick = (menu) => {
        setSelectedMenu(menu);
    };

    const handleCloseMenuDetailModal = () => {
        setSelectedMenu(null);
    };

    const handleRemoveFromCart = (index) => {
        setAddedCartState(prevCart => prevCart.filter((_, i) => i !== index));
    };

    const handleModifyFromCart = (index) => {
        setEditingItem({ ...addedCartState[index], index });
    };

    const handleSaveModifiedItem = (updatedItem) => {
        setAddedCartState(prevCart => prevCart.map((item, i) => (i === updatedItem.index ? updatedItem : item)));
        setEditingItem(null);
    };

    const handleUpFromCart = (index) => {
        setAddedCartState(prevCart => prevCart.map((item, i) =>
            i === index ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const handleDownFromCart = (index) => {
        setAddedCartState(prevCart => prevCart.map((item, i) =>
            i === index && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ));
    };

    return (
        <>
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
                    {categories
                        .filter(category => !disabledCategories.includes(category)) // 비활성화된 카테고리는 필터링
                        .map(category => (
                            <div key={category} onClick={() => handleMenuCategoryOnClick(category)}>
                                {category}
                            </div>
                        ))}
                </div>
                <div css={s.menu}>
                    <MenuCategory selectedCategory={selectedCategory} onMenuItemClick={handleMenuItemClick} />
                </div>
            </main>

            <footer css={s.pay}>
                <div>
                    {addedCartState.length > 0 ? (
                        <ul>
                            {addedCartState.map((item, index) => (
                                <li key={index}>
                                    <div css={s.cartList}>
                                        {index + 1}. {item.detailMenu} 
                                        <span style={{ marginLeft: "auto" }}>
                                            {item.isSet && " 세트"}
                                        </span>
                                        - {item.detailPrice}원 x {item.quantity}
                                    </div>
                                    <div css={s.cartListButtons}>
                                        <div>
                                            <button onClick={() => handleUpFromCart(index)}>▲</button>
                                            <button onClick={() => handleDownFromCart(index)}>▼</button>
                                        </div>
                                        <span>
                                            {(item.isSet) && (
                                                <button css={s.edit} onClick={() => handleModifyFromCart(index)}>수정</button>
                                            )}
                                            <button onClick={() => handleRemoveFromCart(index)}>삭제</button>
                                        </span>
                                    </div>
                                </li>
                            ))} 
                        </ul>
                    ) : (
                        <p>장바구니에 아무것도 없습니다.</p>
                    )}
                </div>
                <span>
                    <p onClick={handlePaymentOnClick}>주문하기</p>
                    <p>상품권</p>
                </span>
            </footer>

            {selectedMenu && <MenuDetailModal menu={selectedMenu} onClose={handleCloseMenuDetailModal} />}
            {editingItem && <MenuModifyModal menu={editingItem} onClose={() => setEditingItem(null)} onSave={handleSaveModifiedItem} />}
        </>
    );
}

export default OrderPage;