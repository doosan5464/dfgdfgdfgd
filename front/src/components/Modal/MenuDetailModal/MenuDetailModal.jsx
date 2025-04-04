/**@jsxImportSource @emotion/react */
import * as s from './style';
import { useRecoilState } from 'recoil';
import { addedCart } from '../../../atoms/addedCart/addedCart';
import React, { useState, useEffect } from 'react';
import menuForUser from '../../../hooks/menu/menuForUser';
import ReactModal from 'react-modal';
import MenuDetailInfoModal from '../MenuDetailInfoModal/MenuDetailInfoModal';


const MenuDetailModal = ({ menu, onClose }) => { // menu, onClose -> OrderPage에서 전달받은 선택한 메뉴 상태
    const [step, setStep] = useState(1);
    const [isSet, setIsSet] = useState(false);
    const [side, setSide] = useState(null);
    const [drink, setDrink] = useState(null);
    const [sideLarge, setSideLarge] = useState(null);
    const [drinkLarge, setDrinkLarge] = useState(null);
    const [addedCartState, setAddedCartState] = useRecoilState(addedCart);

    const [ menuInfoModalOpen, setMenuInfoModalOpen ] = useState(false);
    const [ menuInfoModalData, setMenuInfoModalData ] = useState(null);

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

    }, [radioChecked])

    const [isLarge, setIsLarge] = useState(false);

    const { data: menuData, error, isLoading } = menuForUser(); 
    // console.log("DB메뉴 : ", menuData); // 메뉴 데이터 확인
    // console.log("장바구니 : ", addedCartState); // 메뉴 데이터 확인

    // 사이드와 음료 데이터만 필터링
    const filteredSides = menuData?.filter(item => item.menuCategory === "사이드");
    const filteredDrinks = menuData?.filter(item => item.menuCategory === "음료");

    // 기본 사이드 및 음료
    const defaultSide = filteredSides?.find((item) => item.menuName === "후렌치 후라이")?.menuName;
    const defaultDrink = filteredDrinks?.find((item) => item.menuName === "코카 콜라")?.menuName;

    const defaultSetSide = filteredSides?.find((item) => item.menuName === "후렌치 후라이")?.menuPrice[1].discountPrice - filteredSides?.find((item) => item.menuName === "후렌치 후라이")?.menuPrice[0].discountPrice;
    const defaultSetDrink = filteredDrinks?.find((item) => item.menuName === "코카 콜라")?.menuPrice[1].discountPrice - filteredDrinks?.find((item) => item.menuName === "코카 콜라")?.menuPrice[0].discountPrice;


    const handleTemp = (selectedMenu) => {
        setIsLarge(true);

        console.log("handleTemp의 조건문 바깥");
        console.log("selectedMenu :", selectedMenu);

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

    // 단계
    const handleNext = () => {
        // console.log("Current step:", step); // 현재 단계 확인
        // console.log("카테고리 : ", menu.category);
        // console.log("메뉴 : ", menu);
        
        if (step === 1 && (menu.category === "음료" || menu.category === "커피" || menu.category === "사이드")) {
            setStep(10);
            return;
        }

        if (step === 1) {
            if (isSet === false && (menu.category === "디저트" || menu.category === "버거" || menu.category === "맥모닝")) {
                handleAddToCart(); 
            }
        }
    
        if (step === 3) {
            handleAddToCart(); // 버거 - 최종적으로 장바구니에 추가
            return;
        }
        if (step === 10) {
            handleAddToCart(); // 음료, 커피 - 최종적으로 장바구니에 추가
            return;
        }
    
        setStep((prev) => prev + 1);
    };    

    // 세트 선택 시 기본값 설정
    const handleIsSetOnClick = (boolean) => {
        // console.log("Set chosen:", boolean); // 세트 선택 확인
        setIsSet(boolean);
        if (boolean) {
            setSide(defaultSide);
            setDrink(defaultDrink);
            // console.log(`세트, 추가 금액: 2000`);
        } else {
            setSide(null);
            setDrink(null);
            // console.log(`단품`);
        }
    };

    const handleChangeSideOnClick = (selectedSide) => {
        //console.log("Selected side:", selectedSide); // 선택한 사이드 확인
        if (isSet) {
            let newPrice = filteredSides?.find(side => side.menuName === selectedSide)?.menuPrice[0].discountPrice - filteredSides?.find(side => side.menuName === defaultSide)?.menuPrice[0].discountPrice;
            if (newPrice < 0) {
                newPrice = 0;
            }
            setSide(selectedSide);
            // console.log(`선택한 사이드: ${selectedSide}, 추가 금액: ${newPrice}`);
        }
    };

    const handleChangeDrinkOnClick = (selectedDrink) => {
        //console.log("Selected drink:", selectedDrink); // 선택한 음료 확인
        if (isSet) {
            let newPrice = filteredDrinks?.find(drink => drink.menuName === selectedDrink)?.menuPrice[0].discountPrice - filteredDrinks?.find(drink => drink.menuName === defaultDrink)?.menuPrice[0].discountPrice;
            if (newPrice < 0) {
                newPrice = 0;
            }
            setDrink(selectedDrink);
            // console.log(`선택한 음료: ${selectedDrink}, 추가 금액: ${newPrice}`);
        }
    };

    const handleAddToCart = () => {
        const newOrderId = addedCartState.length > 0 ? Math.max(...addedCartState.map(item => item.orderId)) + 1 : 1;

        // console.log("Menu object before add:", menu); // menu 객체 확인
        const basePrice = isSet ? menu.price1 : isLarge ? menu.price2 : menu.price1; // NaN 방지
        
        // size 는 undefined 다른 조건 찾아야 함
        const sidePrice = isSet 
            ? (side !== defaultSide 
                ? filteredSides?.find(temp1 => temp1.menuName === side)?.menuPrice[sideLarge ? 1 : 0].discountPrice 
                : filteredSides?.find(temp1 => temp1.menuName === defaultSide)?.menuPrice[sideLarge ? 1 : 0].discountPrice) 
            : 0;

        const drinkPrice = isSet 
            ? (drink !== defaultDrink 
                ? filteredDrinks?.find(temp2 => temp2.menuName === drink)?.menuPrice[drinkLarge === "L" ? 1 : 0].discountPrice 
                : filteredDrinks?.find(temp2 => temp2.menuName === defaultDrink)?.menuPrice[drinkLarge === "L" ? 1 : 0].discountPrice) 
            : 0;

        // console.log("Base price:", basePrice); // 기본 가격 확인
        // console.log("Side price:", sidePrice); // 사이드 가격 확인
        // console.log("Drink price:", drinkPrice); // 음료 가격 확인

        const orderDetails = {
            orderId: newOrderId,  // 새로운 orderId를 할당
            detailMenu: menu.name,
            detailSide: isSet ? side : null,
            sideSize: sideLarge ? "L" : "M",
            detailDrink: isSet ? drink : null,
            drinkSize: drinkLarge ? "L" : "M",
            detailPrice: basePrice + sidePrice + drinkPrice,
            quantity: 1,
            isSet: isSet
        };

        // console.log("Order details before adding to cart:", orderDetails); // 장바구니에 추가할 내용 확인

        // 장바구니에 추가
        setAddedCartState((prevCart) => {
            const updatedCart = [...prevCart, orderDetails];

            // 장바구니에서 삭제된 후 orderId를 최신화
            const reorderedCart = updatedCart.map((item, index) => ({
                ...item,
                orderId: index + 1  // orderId를 1부터 순차적으로 재설정
        }));

        // console.log("Updated cart:", reorderedCart);
        return reorderedCart;
    });

    // console.log("장바구니에 추가됨:", orderDetails);
    onClose(); // 모달 닫기
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error("메뉴 데이터를 가져오는 데 실패했습니다:", error);
        return <div>메뉴 데이터를 가져오는 데 실패했습니다.</div>;
    }

    //상세정보 모달로 데이터 전송
    const handleMenuInfoModalButtonOnClick = (menuId) => {
        // console.log("데이터 아이디: " + menuId);
        setMenuInfoModalData(menuId);
        setMenuInfoModalOpen(true);
    }
    //console.log("모달데이터: " + menuInfoModalData);

    return (
        <div css={s.modalOverlay}>
            <div css={s.modalContent}>
                {step === 1 && (
                    <div>
                        <div css={s.modalBasich3}>
                            <h3>세트(사이즈) 선택</h3>
                            <button onClick={() => handleMenuInfoModalButtonOnClick(menuData.find(item => item.menuName === menu.name)?.menuId)}>상세<br></br>정보</button>
                        </div>
                        <div css={s.temp}>
                            <div css={s.modalBuguerSetImage(radioChecked.set === "1")}>
                                <label onClick={() => handleIsSetOnClick(false)}>
                                    <input type="radio" name='set' onChange={handleRadioOnChange} value={1}/>
                                    <img src={menu.img} alt={menu.name} />
                                    <div>
                                        {menu.name}
                                    </div>
                                </label>
                            </div>
                            {menu.category === "버거" && menu.img2 != null && ( // 버거일 때만 세트 옵션 렌더링
                                <div css={s.modalBuguerSetImage(radioChecked.set === "2")}>
                                    <label onClick={() => handleIsSetOnClick(true)}>
                                        <input type="radio" name='set' onChange={handleRadioOnChange} value={2}/>
                                        <img src={menu.img2} alt={menu.name} />
                                        <div>
                                            {menu.name} 세트
                                        </div>
                                    </label>
                                </div>
                            )}
                        </div>
                        <div css={s.nextAndClose}>
                            <span onClick={handleNext}>다음</span>
                            <span onClick={onClose}>닫기</span>
                        </div>
                    </div>
                )}

                {step === 2 && isSet == true && (
                    <div>
                        <div css={s.modalBasich3}>
                            <h3>사이드 선택</h3>
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
                                        <p>{side.menuName} L</p>
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

                {step === 3 && isSet == true && (
                    <div>
                        <div css={s.modalBasich3}>
                            <h3>음료 선택</h3>
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
                                        <p>{drink.menuName} L</p>
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

                {/* 음료와 커피는 세트가 아니라 미디엄 라지임 */}
                {step === 10 && (
                    <div>
                        <div css={s.modalBasich3}>
                            <h3>사이즈 선택</h3>
                        </div>                        
                        <div css={s.temp}>
                            <div css={s.modalBuguerSetImage(radioChecked.size === "1")}>
                                <label>
                                    <input type="radio" name='size' onChange={handleRadioOnChange} value={1}/>
                                    <img src={menu.img} alt={menu.name} />
                                    <div>
                                        미디엄
                                    </div>
                                </label>
                            </div>
                            {menu.img2 !== null && ( 
                                <div css={s.modalBuguerSetImage(radioChecked.size === "2")}>
                                    <label onClick={() => handleTemp(menu.category)}>
                                        <input type="radio" name='size' onChange={handleRadioOnChange} value={2}/>
                                        <img src={menu.img2} alt={menu.name} />
                                        <div>
                                            라지
                                        </div>
                                    </label>
                                </div>
                            )}
                        </div>
                        <div css={s.nextAndClose}>
                            <span onClick={handleNext}>카트에 담기</span>
                            <span onClick={onClose}>닫기</span>
                        </div>
                    </div>
                )}
            </div>

            <ReactModal
                isOpen={menuInfoModalOpen}
                onRequestClose={() => setMenuInfoModalOpen(false)}
                style={{
                    overlay: {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#00000044"
                    },
                    content: {
                        position: "static",
                        boxSizing: "border-box",
                        borderRadius: "1.5rem",
                        padding: "3rem",
                        height: "80rem",
                        width: "80rem",
                    }
                }}
            >
                <MenuDetailInfoModal setOpen={setMenuInfoModalOpen} menuId={menuInfoModalData} />
            </ReactModal>
        </div>
    );
};

export default MenuDetailModal;