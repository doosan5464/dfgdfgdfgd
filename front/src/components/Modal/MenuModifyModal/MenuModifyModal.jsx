import { useState } from "react";
import { useRecoilState } from "recoil";
import { addedCart } from "../../../atoms/addedCart/addedCart";
import useMenuData from "../../../hooks/menu/getMenuHooks";
/**@jsxImportSource @emotion/react */
import * as s from './style';

// 수정하면 같은 이름의 버거는 다 같이 수정되버림. 어떻게 하지? 인덱스? 고유 ID?
// 수정하면 같은 이름의 버거는 다 같이 수정되버림. 어떻게 하지? 인덱스? 고유 ID?
// 수정하면 같은 이름의 버거는 다 같이 수정되버림. 어떻게 하지? 인덱스? 고유 ID?
// 수정하면 같은 이름의 버거는 다 같이 수정되버림. 어떻게 하지? 인덱스? 고유 ID?
// 수정하면 같은 이름의 버거는 다 같이 수정되버림. 어떻게 하지? 인덱스? 고유 ID?
// 수정하면 같은 이름의 버거는 다 같이 수정되버림. 어떻게 하지? 인덱스? 고유 ID?
// 수정하면 같은 이름의 버거는 다 같이 수정되버림. 어떻게 하지? 인덱스? 고유 ID?
// 수정하면 같은 이름의 버거는 다 같이 수정되버림. 어떻게 하지? 인덱스? 고유 ID?

const MenuModifyModal = ({ menu, onClose }) => {
    const [step, setStep] = useState(2);
    const [side, setSide] = useState(null);
    const [drink, setDrink] = useState(null);
    const [addedCartState, setAddedCartState] = useRecoilState(addedCart);
    const { data: menuData, error, isLoading } = useMenuData();

    // 필터링된 사이드와 음료
    const filteredSides = menuData?.filter(item => item.menuCategory === "사이드");
    const filteredDrinks = menuData?.filter(item => item.menuCategory === "음료");

    const filteredBurgers = menuData?.filter(item => item.menuCategory === "버거");
    console.log("으으이익", filteredBurgers);

    // 기본 사이드와 음료
    const defaultSide = filteredSides?.find(item => item.menuName === "후렌치 후라이")?.menuName;
    const defaultDrink = filteredDrinks?.find(item => item.menuName === "코카 콜라")?.menuName;

    const selectBurger = filteredBurgers?.find(item => item.menuName === menu.detailMenu).menuName;
    console.log("아아악이익", selectBurger); 

    const handleNext = () => {
        if (step === 3) {
            updateCartItemMultiple();
            return;
        }
        setStep(prev => prev + 1);
    };

    const handleChangeSideOnClick = (selectedSide) => {
        setSide(selectedSide);
    };
    
    const handleChangeDrinkOnClick = (selectedDrink) => {
        setDrink(selectedDrink);
    };

    const handleAddToCart = () => {
        // 기본 사이드나 음료의 가격을 `discountPrice`로 설정
        const sidePrice = side !== defaultSide 
            ? filteredSides?.find(temp1 => temp1.menuName === side)?.menuPrice[0].discountPrice 
            : filteredSides?.find(temp1 => temp1.menuName === defaultSide)?.menuPrice[0].discountPrice || 0;
    
        const drinkPrice = drink !== defaultDrink 
            ? filteredDrinks?.find(temp2 => temp2.menuName === drink)?.menuPrice[0].discountPrice 
            : filteredDrinks?.find(temp2 => temp2.menuName === defaultDrink)?.menuPrice[0].discountPrice || 0;
    
        // 메뉴의 가격을 menuData에서 동적으로 가져옴
        const basePrice = filteredBurgers?.find(item => item.menuName === selectBurger)?.menuPrice[0].menuPrice || 0;

        console.log("메뉴우욱 :", menu);
        console.log("메뉴데이터어억! :", menuData);
    
        // 콘솔 로그 추가
        console.log("sidePrice:", sidePrice);
        console.log("drinkPrice:", drinkPrice);
        console.log("basePrice:", basePrice);
    
        const updatedCart = addedCartState.map(item => {
            if (item.detailMenu === menu.detailMenu) {
                const updatedPrice = basePrice + sidePrice + drinkPrice;
                console.log("Updated Price for", menu.detailMenu, ":", updatedPrice);
                return {
                    ...item,
                    detailSide: side,
                    detailDrink: drink,
                    detailPrice: updatedPrice,
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
                const sidePrice = side ? filteredSides.find(s => s.menuName === side)?.menuPrice[0].discountPrice : 0;
                const drinkPrice = drink ? filteredDrinks.find(d => d.menuName === drink)?.menuPrice[0].discountPrice : 0;
    
                const updatedPrice = menu.price1 + sidePrice + drinkPrice;
                console.log("Updated Price for", menu.detailMenu, ":", updatedPrice);
    
                return {
                    ...item,
                    detailSide: side,
                    detailDrink: drink,
                    detailPrice: updatedPrice,
                };
            }
            return item;
        });
    
        setAddedCartState(updatedCart);
    };

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>메뉴 데이터를 가져오는 데 실패했습니다.</div>;

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