import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { addedCart } from '../../../atoms/addedCart/addedCart';
import * as PortOne from "@portone/browser-sdk/v2"; // PortOne 결제 SDK
import { v4 as uuid } from 'uuid'; // UUID 라이브러리
/**@jsxImportSource @emotion/react */
import * as s from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import menuForUser from '../../../hooks/menu/menuForUser';
import { usePointApi } from '../../../apis/pointApi';
import { usePointMutation } from '../../../mutations/useProcessPointMutation';

/*
  해야 할 것
  - 결제 후 장바구니를 비운다
  - 총 결제 금액과 menuName과 일치하는 menuPrice를 DB에서 가져온다
  - isSet을 검사하는 로직을 추가해서
  - order_id, menu_price_id, menu_count, is_set를 DB에 POST로 보내야 한다
*/

const SelectPayMethod = () => {
    const { data: menuData, error, isLoading } = menuForUser();
    const [orderId, setOrderId] = useState(0);
    const navi = useNavigate();
    
    // usePointMutation 훅을 아래 위치에서 호출
    const { mutateAsync: usePoints } = usePointMutation(); // 이 라인을 이동시켜서 제대로 훅을 사용할 수 있도록 처리

    const location = useLocation();
    const [usePoint, setUsePoint] = useState(location.state?.usePoint || 0);
    const [phoneNumber, setPhoneNumber] = useState(location.state?.phoneNumber || "");

    console.log(location.state)
    // 장바구니 상태 관리
    const [addedCartState] = useRecoilState(addedCart);

    // 장바구니의 가격 합산
    const totalPrice = addedCartState.reduce((sum, item) => sum + (item.detailPrice) * item.quantity, 0); // 모든 상품 가격 합산

    const productName = addedCartState
    .map((temp) => 
        [`${temp.detailMenu}`]
            .filter(Boolean) // `null`, `undefined`, `""` 같은 값 제거
            .join(", ") // 공백 하나로 이어붙이기
    )
    .join(", "); // 여러 개의 상품명을 하나의 문자열로 변환 (그래야 카카오페이API에 포함시킬 수 있음)


    const [orderNumber, setOrderNumber] = useState(() => {
        const savedOrderId = localStorage.getItem('orderId');
        return savedOrderId ? parseInt(savedOrderId, 10) : 1000;
    });
    
    // 주문 번호를 증가시키고 localStorage에 저장
    const incrementOrderId = () => {
        const newOrderId = orderNumber + 1;
        localStorage.setItem('orderId', newOrderId);  // 증가된 번호 저장
        setOrderNumber(newOrderId);  // 상태 업데이트
    };

    // 지금은 임시로 주문번호를 쓰는데, 관리자 메뉴쪽에서 주문번호를 관리하는 페이지를 만들어서, 1000 9001 9001 9002 9003 / 9001 9066
    const products = addedCartState.map((item) => ({
        orderNumber, // 1000부터 시작, 1씩 증가
        productName: item.detailMenu,
        side: item.detailSide,
        drink: item.detailDrink,
        price: item.detailPrice,
        quantity: item.quantity,
    }));

    // ✅ 장바구니 데이터를 order_detail_tb용으로 가공
    const buildOrderDetailList = async () => {
        if (!menuData || menuData.length === 0) return [];

        const orderDetailList = [];

        await addedCartState.forEach((item) => {
            const { isSet, detailMenu, detailSide, detailDrink, sideSize, drinkSize, quantity } = item;

            const mainMenu = menuData.find((menu) =>
                menu.menuName === detailMenu
            );

            if (mainMenu) {
                let priceInfo = null;
                if (mainMenu.menuCategory === "버거") {
                    priceInfo = mainMenu.menuPrice[0];
                }
                if (mainMenu.menuCategory === "디저트") {
                    priceInfo = mainMenu.menuPrice[0];
                }
                if (mainMenu.menuCategory === "사이드") {
                    priceInfo = mainMenu.menuPrice.find(price => price.size === sideSize);
                }
                if (mainMenu.menuCategory === "음료") {
                    priceInfo = mainMenu.menuPrice.find(price => price.size === drinkSize);
                }
                if (mainMenu.menuCategory === "커피") {
                    priceInfo = mainMenu.menuPrice.find(price => price.size === drinkSize);
                }

                if (priceInfo) {
                    orderDetailList.push({
                        order_id: products[0].orderNumber, // 주문 임시 번호
                        menu_price_id: priceInfo.menuPriceId, // 가격 ID
                        menu_count: quantity, // 수량
                        is_set: isSet, // 세트 여부
                    });
                }
            }

            // 사이드 메뉴 추가
            if (detailSide) {
                const sideMenu = menuData.find((menu) =>
                    menu.menuName === detailSide &&
                    menu.menuPrice.some(price => price.size === sideSize)
                );

                if (sideMenu) {
                    const priceInfo = sideMenu.menuPrice.find(price => price.size === sideSize);
                    if (priceInfo) {
                        orderDetailList.push({
                            order_id: products[0].orderNumber, // 주문 임시 번호
                            menu_price_id: priceInfo.menuPriceId, // 가격 ID
                            menu_count: quantity, // 수량
                            is_set: false, // 사이드는 세트 메뉴가 아니므로 false
                        });
                    }
                }
            }

            // 음료 메뉴 추가
            if (detailDrink) {
                const drinkMenu = menuData.find((menu) =>
                    menu.menuName === detailDrink &&
                    menu.menuPrice.some(price => price.size === drinkSize)
                );

                if (drinkMenu) {
                    const priceInfo = drinkMenu.menuPrice.find(price => price.size === drinkSize);
                    if (priceInfo) {
                        orderDetailList.push({
                            order_id: products[0].orderNumber, // 주문 임시 번호
                            menu_price_id: priceInfo.menuPriceId, // 가격 ID
                            menu_count: quantity, // 수량
                            is_set: false, // 음료는 세트 메뉴가 아니므로 false
                        });
                    }
                }
            }
        });

        return orderDetailList;
    };

    const handlePaymentOnClick = async () => {
        try {
            const orderDetailList = await buildOrderDetailList();
            const orderIdFromList = orderDetailList[0]?.order_id;
            incrementOrderId();  

            if (!orderIdFromList) {
                console.error("주문 ID가 없습니다.");
                return;  
            }

            const paymentAmount = totalPrice - usePoint;  
            const finalAmount = paymentAmount < 0 ? 0 : paymentAmount;

            const paymentResponse = await PortOne.requestPayment({
                storeId: import.meta.env.VITE_PORTONE_STOREID,
                paymentId: uuid(),
                orderName: productName,
                totalAmount: finalAmount,
                currency: "CURRENCY_KRW",
                payMethod: "EASY_PAY",
                channelKey: "channel-key-39a34f05-a2cb-44f1-a0ca-0798cf19bca2",
                products: products.map(product => ({
                    id: product.orderNumber.toString(),
                    name: [product.productName, product.side, product.drink].filter(Boolean).join(", "),
                    amount: product.price,
                    quantity: product.quantity,
                })),
            });

            const point = Math.floor(totalPrice * 0.05);

            // 이 자리에서 order_tb 에 POST 
            console.log("order_tb에 보낼 2개, orderTempId :", products[0].orderNumber, "totalPrice :", totalPrice);

            // 이 자리에서 
            console.log("order_detail_tb에 보낼 형식 : ", JSON.stringify(orderDetailList, null, 1));

            navi("/savePoint", {
                state: {
                    point: point,
                    orderId: orderIdFromList, 
                }
            });

            try {
                await usePoints({
                    phoneNumber: phoneNumber,
                    calcul: 0,  
                    point: usePoint,
                });
                alert(`포인트 ${usePoint}점이 사용되었습니다!`);
            } catch (error) {
                alert("포인트 적립 중 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("결제 오류 발생:", error);
        }
    };

    console.log(phoneNumber)
    console.log(usePoint)
    return (
        <div css={s.container}>
            <div css={s.header}>
                <div onClick={handlePaymentOnClick}>
                    <img src="https://miro.medium.com/v2/resize:fit:680/0*ztVd5YkRc7IiSxXu.png" alt="카카오페이" />
                </div>
            </div>
            <div css={s.footer}>
                <div onClick={() => navi("/previousPage")}>이전 단계</div>
            </div>
        </div>
    );
};

export default SelectPayMethod;