/**@jsxImportSource @emotion/react */
import * as s from './style';
import { useRecoilState } from 'recoil';
import { addedCart } from '../../../atoms/addedCart/addedCart';
import React, { useState, useEffect } from 'react';
import useMenuData from '../../../hooks/menu/getMenuHooks';

const MenuModifyModal = ({ menu, onClose }) => {
    const [step, setStep] = useState(2);
    const [side, setSide] = useState(null);
    const [drink, setDrink] = useState(null);
    const [addedCartState, setAddedCartState] = useRecoilState(addedCart);

    const { data: menuData, error, isLoading } = useMenuData();
    console.log("Fetched menu data:", menuData);
    
    const filteredSides = menuData?.filter(item => item.menuCategory === "사이드");
    const filteredDrinks = menuData?.filter(item => item.menuCategory === "음료");

    const defaultSide = filteredSides?.find(item => item.menuName === "후렌치 후라이")?.menuName;
    const defaultDrink = filteredDrinks?.find(item => item.menuName === "코카 콜라")?.menuName;

    const handleNext = () => {
        if (step === 3) {
            updateCartItemMultiple();
            return;
        }
        setStep((prev) => prev + 1);
    };

    const handleChangeSideOnClick = (selectedSide) => {
        setSide(selectedSide);
    };
    
    const handleChangeDrinkOnClick = (selectedDrink) => {
        setDrink(selectedDrink);
    };

    const handleAddToCart = () => {
        const basePrice = menu.detailPrice;
        const sidePrice = side !== defaultSide ? filteredSides?.find(temp1 => temp1.menuName === side)?.menuPrice[0].discountPrice : 0;
        const drinkPrice = drink !== defaultDrink ? filteredDrinks?.find(temp2 => temp2.menuName === drink)?.menuPrice[0].discountPrice : 0;

        const updatedCart = addedCartState.map(item => {
            if (item.detailMenu === menu.detailMenu) {
                return {
                    ...item,
                    detailSide: side,
                    detailDrink: drink,
                    detailPrice: basePrice + sidePrice + drinkPrice,
                };
            }
            return item;
        });

        setAddedCartState(updatedCart);
        onClose();
    };

    const updateCartItemMultiple = () => {
        const updatedCart = addedCartState.map(item => {
            if (item.detailMenu === menu.detailMenu) {
                return {
                    ...item,
                    detailSide: side,
                    detailDrink: drink,
                    detailPrice: menu.price1 + (side ? filteredSides.find(s => s.menuName === side)?.menuPrice[0].discountPrice : 0) + (drink ? filteredDrinks.find(d => d.menuName === drink)?.menuPrice[0].discountPrice : 0),
                };
            }
            return item;
        });

        setAddedCartState(updatedCart);
    };

    useEffect(() => {
        console.log("updated addedCartState:", addedCartState);
    }, [addedCartState]);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error("메뉴 데이터를 가져오는 데 실패했습니다:", error);
        return <div>메뉴 데이터를 가져오는 데 실패했습니다.</div>;
    }

    return (
        <div css={s.modalOverlay}>
            <div css={s.modalContent}>
                {step === 2 && (
                    <div>
                        <h3 css={s.modalBasich3}>사이드 수정</h3>
                        <div css={s.mapParent}>
                            {filteredSides?.map((side, index) => (
                                <div css={s.childrenDiv} key={`${side.menuName}-${index}`}>
                                    <div css={s.modalSideSetImage}>
                                        <div onClick={() => handleChangeSideOnClick(side.menuName)}>
                                            <img src={side.singleImg} alt={side.menuName} />
                                            <div>
                                                <p>{side.menuName}</p>
                                                <p>{side.menuName === defaultSide ? "+0원" : `+${side.menuPrice[0].discountPrice - filteredSides.find(side => side.menuName === defaultSide)?.menuPrice[0].discountPrice}원`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div css={s.nextAndClose}>
                            <span onClick={handleNext}>다음</span>
                            <span onClick={onClose}>닫기</span>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h3 css={s.modalBasich3}>음료 수정</h3>
                        <div css={s.mapParent}>
                            {filteredDrinks?.map((drink, index) => (
                                <div css={s.childrenDiv} key={`${drink.menuName}-${index}`}>
                                    <div css={s.modalSideSetImage}>
                                        <div onClick={() => handleChangeDrinkOnClick(drink.menuName)}>
                                            <img src={drink.singleImg} alt={drink.menuName} />
                                            <div>
                                                <p>{drink.menuName}</p>
                                                <p>{drink.menuName === defaultDrink ? "+0원" : `+${drink.menuPrice[0].discountPrice - filteredDrinks.find(drink => drink.menuName === defaultDrink)?.menuPrice[0].discountPrice}원`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div css={s.cartParent}>
                            <button onClick={handleAddToCart} css={s.cart}>카트에 담기</button>
                            <button onClick={onClose} css={s.closeTemp}>닫기</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuModifyModal;
