import React, { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { addedCart } from '../../../atoms/addedCart/addedCart';
import * as PortOne from "@portone/browser-sdk/v2"; // PortOne 결제 SDK
import { v4 as uuid } from 'uuid'; // UUID 라이브러리
/**@jsxImportSource @emotion/react */
import * as s from './style';
import { useNavigate } from 'react-router-dom';
import menuForUser from '../../../hooks/menu/menuForUser';

/*

해야 할 것
여기서 결제하고 장바구니를 비운다

여기서 계산한 총 결제금액과
menuName과 일치하는 menuPrice를 DB에서 가져온다

이 둘과 

isSet을 검사하는 로직을 추가해서

order_id, menu_price_id, menu_count, is_set
를 DB에 POST로 보내야 한다

*/

const SelectPayMethod = () => {

    const { data: menuData, error, isLoading } = menuForUser(); 
    // console.log("DB메뉴 : ", JSON.stringify(menuData, null, 2));

    const navi = useNavigate();

    const handleOnClickNext = () => {
        navi("/payment")
    }

    // 장바구니 상태 관리
    const [addedCartState] = useRecoilState(addedCart);

    // 장바구니의 가격 합산
    const totalPrice = addedCartState.reduce((sum, item) => sum + (item.detailPrice) * item.quantity, 0); // 모든 상품 가격 합산

    console.log("장바구니 목록 : ", addedCartState);
    
    console.log("DB에 보낼 총 가격 : ", totalPrice);

    const productName = addedCartState
    .map((temp) => 
        [`${temp.detailMenu}`]
            .filter(Boolean) // `null`, `undefined`, `""` 같은 값 제거
            .join(", ") // 공백 하나로 이어붙이기
    )
    .join(", "); // 여러 개의 상품명을 하나의 문자열로 변환 (그래야 카카오페이API에 포함시킬 수 있음)
    
    // 지금은 임시로 주문번호를 쓰는데, 관리자 메뉴쪽에서 주문번호를 관리하는 페이지를 만들어서, 1000 9001 9001 9002 9003 / 9001 9066
    const products = addedCartState.map((item) => ({
        orderId: Math.min(addedCartState.length * 1000, 9000) + (addedCartState.length - 1), // 1000부터 시작, 1씩 증가
        productName: item.detailMenu,
        side: item.detailSide,
        drink: item.detailDrink,
        price: item.detailPrice,
        quantity: item.quantity,
    }));


    // ✅ 장바구니 데이터를 order_detail_tb용으로 가공 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    const buildOrderDetailList = async () => {
        // 메뉴 데이터가 없거나 비어 있으면 빈 배열 반환
        if (!menuData || menuData.length === 0) return [];
    
        const orderDetailList = [];
    
        // 장바구니에 있는 각 아이템에 대해 반복
        await addedCartState.forEach((item) => {
            const { isSet, detailMenu, detailSide, detailDrink, sideSize, drinkSize, quantity } = item;
    

            // 1. 메인 메뉴 추가: 장바구니 아이템에서 메인 메뉴 찾기
            const mainMenu = menuData.find((menu) =>
                menu.menuName === detailMenu // 메뉴 이름이 일치하는지 확인
            );
            console.log("mainMenu : ", mainMenu);
    
            // 메인 메뉴가 존재하면 해당 메뉴 정보를 추가
            if (mainMenu) {
                let priceInfo = null;

                // 가격 정보 가져오기
                if (mainMenu.menuCategory === "버거") {
                    priceInfo = mainMenu.menuPrice[0];
                    console.log("버거일때 priceInfo:", priceInfo);
                }
                if (mainMenu.menuCategory === "디저트") {
                    priceInfo = mainMenu.menuPrice[0];
                    console.log("디저트일때 priceInfo:", priceInfo);
                }
                if (mainMenu.menuCategory === "사이드") {
                    priceInfo = mainMenu.menuPrice.find(price => price.size === sideSize);
                    console.log("사이드일때 priceInfo:", priceInfo);
                }
                if (mainMenu.menuCategory === "음료") {
                    priceInfo = mainMenu.menuPrice.find(price => price.size === drinkSize);
                    console.log("음료일때 priceInfo:", priceInfo);
                }
                if (mainMenu.menuCategory === "커피") {
                    priceInfo = mainMenu.menuPrice.find(price => price.size === drinkSize);
                    console.log("커피일때 priceInfo:", priceInfo);
                }
                
                if (priceInfo) {
                    orderDetailList.push({
                        order_id: products[0].orderId, // 주문 임시 번호
                        menu_price_id: priceInfo.menuPriceId, // 가격 ID
                        menu_count: quantity, // 수량
                        is_set: isSet, // 세트 여부
                    });
                    console.log("메인 메뉴 추가 후 orderDetailList : ", orderDetailList);
                }
            } else {
                console.warn(`메인 메뉴 매칭 실패: ${detailMenu}, size: ${size}, isSet: ${isSet}`);
            }
    
            // 2. 사이드 메뉴 추가: 사이드가 있을 경우, 사이드 메뉴를 개별 아이템으로 추가
            if (detailSide) {
                const sideMenu = menuData.find((menu) =>
                    menu.menuName === detailSide && // 사이드 메뉴 이름이 일치하는지 확인
                    menu.menuPrice.some(price => price.size === sideSize) // 사이드의 사이즈가 일치하는지 확인, .some() : 배열의 각 요소에 대해 주어진 조건을 만족하는 적어도 하나의 요소가 있으면 true를 반환하고, 그렇지 않으면 false를 반환

                );
                console.log("sideMenu : ", sideMenu);
    
                // 사이드 메뉴가 존재하면 해당 메뉴 정보를 추가
                if (sideMenu) {
                    const priceInfo = sideMenu.menuPrice.find(price => price.size === sideSize);
                    if (priceInfo) {
                        orderDetailList.push({
                            order_id: products[0].orderId, // 주문 임시 번호
                            menu_price_id: priceInfo.menuPriceId, // 가격 ID
                            menu_count: quantity, // 수량
                            is_set: false, // 사이드는 세트 메뉴가 아니므로 false
                        });
                    }
                    console.log("사이드 메뉴 추가 후 orderDetailList : ", orderDetailList);
                } else {
                    console.warn(`사이드 메뉴 매칭 실패: ${detailSide}, size: ${sideSize}`);
                }
            }
    
            // 3. 음료 메뉴 추가: 음료가 있을 경우, 음료 메뉴를 개별 아이템으로 추가
            if (detailDrink) {
                const drinkMenu = menuData.find((menu) =>
                    menu.menuName === detailDrink && // 음료 메뉴 이름이 일치하는지 확인
                    menu.menuPrice.some(price => price.size === drinkSize) // 음료의 사이즈가 일치하는지 확인

                );
                console.log("drinkMenu : ", drinkMenu);
    
                // 음료 메뉴가 존재하면 해당 메뉴 정보를 추가
                if (drinkMenu) {
                    const priceInfo = drinkMenu.menuPrice.find(price => price.size === drinkSize);
                    if (priceInfo) {
                        orderDetailList.push({
                            order_id: products[0].orderId, // 주문 임시 번호
                            menu_price_id: priceInfo.menuPriceId, // 가격 ID
                            menu_count: quantity, // 수량
                            is_set: false, // 음료는 세트 메뉴가 아니므로 false
                        });
                    }
                    console.log("음료 메뉴 추가 후 orderDetailList : ", orderDetailList);
                } else {
                    console.warn(`음료 메뉴 매칭 실패: ${detailDrink}, size: ${drinkSize}`);
                }
            }
        });
        console.log("orderDetailList 배열. DB에 보내기 좋게 만든 배열", orderDetailList);
    
        // 주문 상세 목록 반환
        return orderDetailList;
    };
    
    
    

    // 결제 요청 함수
    const handlePaymentOnClick = async () => {
        try {
            // PortOne 결제 요청
            const paymentResponse = await PortOne.requestPayment({
                storeId: import.meta.env.VITE_PORTONE_STOREID, // 환경 변수에서 가져온 상점 ID
                paymentId: uuid(), // UUID를 사용해 유니크한 결제 ID 생성
                orderName: productName, 
                totalAmount: totalPrice, // 합산된 가격
                currency: "CURRENCY_KRW", // 결제 통화 (원화)
                payMethod: "EASY_PAY", // 간편결제 방식 사용
                channelKey: "channel-key-39a34f05-a2cb-44f1-a0ca-0798cf19bca2", // PortOne 채널 키
                // menuId:
                products: products.map(product => ({
                    id: product.orderId.toString(), // 상품 ID
                    name: [product.productName, product.side, product.drink].filter(Boolean).join(", "),  // 상품명
                    amount: product.price, // 상품 가격
                    quantity: product.quantity, // 수량
                })),
            });

            // 포인트 적립 처리
            const point = Math.floor(totalPrice * 0.05);  // 0.5% 포인트 계산
            console.log("마일리지 금액 : ", point);

            console.log("보내기전 주문번호 : ", products);
            console.log("보내기전 임시 주문번호 : ", products[0].orderId);

            // 여기서 order_detail_tb에 보내야 함 (장바구니 초기화 하기 전에) @@@@@@@@@@@@@@@@@@@@@@@
            buildOrderDetailList();
            
            // 장바구니 상태 초기화
            // const resetCart = useResetRecoilState(addedCart);
            
            // 장바구니 완전 초기화
            // resetCart();

            navi("/savePoint", {
                state: {
                    point: point,
                    orderId: products[0].orderId,
                }
            }); // state로 넘김
            
        } catch (error) {
            console.log(error); // 결제 요청 중 에러 발생 시 출력
        }
    };



    return (
        <div css={s.container}>
            <div css={s.header}>
                {/* 결제 요청 버튼 */}
                <div onClick={handlePaymentOnClick}>
                    <img src="https://miro.medium.com/v2/resize:fit:680/0*ztVd5YkRc7IiSxXu.png" alt="카카오페이" />
                </div>
            </div>
            <div css={s.footer}>
                <div onClick={handleOnClickNext}>이전 단계</div>
            </div>
        </div>
    );
};

export default SelectPayMethod;