import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { addedCart } from "../../../atoms/addedCart/addedCart";
/**@jsxImportSource @emotion/react */
import * as s from './style';
import menuForUser from "../../../hooks/menu/menuForUser";


const MenuModifyModal = ({ menu, onClose }) => {
    const [step, setStep] = useState(2);
    const [side, setSide] = useState(null);
    const [drink, setDrink] = useState(null);
    const [addedCartState, setAddedCartState] = useRecoilState(addedCart);
    const { data: menuData, error, isLoading } = menuForUser();
    const [sideLarge, setSideLarge] = useState("M");
    const [drinkLarge, setDrinkLarge] = useState("M");
    const [isLarge, setIsLarge] = useState(false);
    const [isSet] = useState(true);

    // 필터링된 사이드와 음료
    const filteredSides = menuData?.filter(item => item.menuCategory === "사이드");
    const filteredDrinks = menuData?.filter(item => item.menuCategory === "음료");

    const filteredBurgers = menuData?.filter(item => item.menuCategory === "버거");

    // 기본 사이드와 음료
    const defaultSide = filteredSides?.find(item => item.menuName === "후렌치 후라이")?.menuName;
    const defaultDrink = filteredDrinks?.find(item => item.menuName === "코카 콜라")?.menuName;

    const defaultSetSide = filteredSides?.find((item) => item.menuName === "후렌치 후라이")?.menuPrice[1].discountPrice - filteredSides?.find((item) => item.menuName === "후렌치 후라이")?.menuPrice[0].discountPrice;
    const defaultSetDrink = filteredDrinks?.find((item) => item.menuName === "코카 콜라")?.menuPrice[1].discountPrice - filteredDrinks?.find((item) => item.menuName === "코카 콜라")?.menuPrice[0].discountPrice;

    const selectBurger = filteredBurgers?.find(item => item.menuName === menu.detailMenu).menuName;

    const [ radioChecked, setRadioChecked ] = useState({
        set: "1",
        side: "0",
        drink: "0",
        size: "1",
    }) 

    const handleRadioOnChange = (e) => {
        setRadioChecked(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    useEffect(() => {
        // console.log(radioChecked);
    }, [radioChecked])

    const handleTemp = (selectedMenu) => {
        setIsLarge(true);

        console.log("handleTemp의 조건문 바깥");
        console.log("selectedMenu의 카테고리 :", selectedMenu);

        if (selectedMenu === "음료" || selectedMenu === "커피") {
            setDrinkLarge("L")
            console.log("handleTemp의 조건문 안쪽 drink");
        }

        if (selectedMenu === "사이드") {
            setSideLarge("L")
            console.log("handleTemp의 조건문 안쪽 side");
        }

        return;
    }

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
        // 기본 사이드와 음료를 설정 (선택되지 않았을 경우 기본값 사용)
        const selectedSide = side || defaultSide;
        const selectedDrink = drink || defaultDrink;
    
        const sidePrice = isSet
            ? (selectedSide !== defaultSide
                ? filteredSides?.find(temp1 => temp1.menuName === selectedSide)?.menuPrice[sideLarge === "L" ? 1 : 0].discountPrice
                : filteredSides?.find(temp1 => temp1.menuName === defaultSide)?.menuPrice[sideLarge === "L" ? 1 : 0].discountPrice)
            : 0;

        const drinkPrice = isSet
            ? (selectedDrink !== defaultDrink
                ? filteredDrinks?.find(temp2 => temp2.menuName === selectedDrink)?.menuPrice[drinkLarge === "L" ? 1 : 0].discountPrice
                : filteredDrinks?.find(temp2 => temp2.menuName === defaultDrink)?.menuPrice[drinkLarge === "L" ? 1 : 0].discountPrice)
            : 0;
    
        const basePrice = filteredBurgers?.find(item => item.menuName === selectBurger)?.menuPrice[0].menuPrice || 0;
    
        console.log("basePrice:", basePrice);
        console.log("sidePrice:", sidePrice);
        console.log("drinkPrice:", drinkPrice);
    
        const updatedCart = addedCartState.map(item => {
            if (item.orderId === menu.orderId && item.detailMenu === menu.detailMenu) {
                const updatedPrice = basePrice + sidePrice + drinkPrice;
                console.log("Updated Price for", menu.detailMenu, ":", updatedPrice);
                return {
                    ...item,
                    detailSide: selectedSide,
                    detailDrink: selectedDrink,
                    detailPrice: updatedPrice,
                    sideSize: sideLarge,
                    drinkSize: drinkLarge
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
                        <div css={s.modalBasich3}>
                            <h3>사이드 수정</h3>
                        </div>
                        <div css={s.mapParent}>
                        {filteredSides
                            ?.filter((menu) => menu.isExposure === 1)
                            .sort((a, b) => a.menuSequence - b.menuSequence)
                            .flatMap((side, index) => {
                                const common = {
                                key: `${side.menuName}-${index}`,
                                name: side.menuName,
                                };
                                const defaultPrice = filteredSides?.find(d => d.menuName === defaultSide)?.menuPrice[0]?.discountPrice;

                                const single = (
                                <div css={s.modalSideSetImage(radioChecked.side === `${index}-single`)} key={`${side.menuName}-single`}>
                                    <label onClick={() => handleChangeSideOnClick(side.menuName)}>
                                    <input type="radio" name="side" onChange={handleRadioOnChange} value={`${index}-single`} />
                                    <img src={side.singleImg} alt={side.menuName} />
                                    <div>
                                        <p>{side.menuName}</p>
                                        <p>{side.menuName === defaultSide ? "+0원" : `+${Math.max(side.menuPrice[0].discountPrice - defaultPrice, 0)}원`}</p>
                                    </div>
                                    </label>
                                </div>
                                );

                                const set = side.setImg && (
                                <div css={s.modalSideSetImage(radioChecked.side === `${index}-set`)} key={`${side.menuName}-set`}>
                                    <label onClick={() => {
                                    handleChangeDrinkOnClick(side.menuName);
                                    handleTemp(side.menuCategory);
                                    }}>
                                    <input type="radio" name="side" onChange={handleRadioOnChange} value={`${index}-set`} />
                                    <img src={side.setImg} alt={`${side.menuName} 세트`} />
                                    <div>
                                        <p>{side.menuName}</p>
                                        <p>{side.menuName === defaultSide ? `+${defaultSetSide}원` : `+${Math.max(side.menuPrice[1].discountPrice - defaultPrice, 0)}원`}</p>
                                    </div>
                                    </label>
                                </div>
                                );

                                return set ? [single, set] : [single];
                            })
                        }
                        </div>
                        <div css={s.nextAndClose}>
                            <span onClick={handleNext}>다음</span>
                            <span onClick={onClose}>닫기</span>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <div css={s.modalBasich3}>
                            <h3>음료 수정</h3>
                        </div>
                        <div css={s.mapParent}>
                            {filteredDrinks
                            ?.filter((menu) => menu.isExposure === 1)
                            .sort((a, b) => a.menuSequence - b.menuSequence)
                            .flatMap((drink, index) => {
                                const common = {
                                key: `${drink.menuName}-${index}`,
                                name: drink.menuName,
                                };
                                const defaultPrice = filteredDrinks?.find(d => d.menuName === defaultDrink)?.menuPrice[0]?.discountPrice;

                                const single = (
                                <div css={s.modalSideSetImage(radioChecked.drink === `${index}-single`)} key={`${drink.menuName}-single`}>
                                    <label onClick={() => handleChangeDrinkOnClick(drink.menuName)}>
                                    <input type="radio" name="drink" onChange={handleRadioOnChange} value={`${index}-single`} />
                                    <img src={drink.singleImg} alt={drink.menuName} />
                                    <div>
                                        <p>{drink.menuName}</p>
                                        <p>{drink.menuName === defaultDrink ? "+0원" : `+${Math.max(drink.menuPrice[0].discountPrice - defaultPrice, 0)}원`}</p>
                                    </div>
                                    </label>
                                </div>
                                );

                                const set = drink.setImg && (
                                <div css={s.modalSideSetImage(radioChecked.drink === `${index}-set`)} key={`${drink.menuName}-set`}>
                                    <label onClick={() => {
                                    handleChangeDrinkOnClick(drink.menuName);
                                    handleTemp(drink.menuCategory);
                                    }}>
                                    <input type="radio" name="drink" onChange={handleRadioOnChange} value={`${index}-set`} />
                                    <img src={drink.setImg} alt={`${drink.menuName} 세트`} />
                                    <div>
                                        <p>{drink.menuName}</p>
                                        <p>{drink.menuName === defaultDrink ? `+${defaultSetDrink}원` : `+${Math.max(drink.menuPrice[1].discountPrice - defaultPrice, 0)}원`}</p>
                                    </div>
                                    </label>
                                </div>
                                );

                                return set ? [single, set] : [single];
                            })
                        }
                        </div>
                        <div css={s.nextAndClose}>
                            <span onClick={handleAddToCart} css={s.cart}>카트에 담기</span>
                            <span onClick={onClose} css={s.closeTemp}>닫기</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuModifyModal;