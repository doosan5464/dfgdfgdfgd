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
import { useOrderId } from '../../../hooks/order/getOrderIdHook';
import { postOrderDetailTb, postOrderTb } from '../../../mutations/order/orderMutation';


const SelectPayMethod = () => {    
    const location = useLocation();
    const navi = useNavigate();

    const { data: menuData, error, isLoading } = menuForUser();
    const { data: orderIdFromTb, errorFromTb, isLoading: isLoadingOrderId } = useOrderId(); // 수정된 훅 사용
    
    // usePointMutation 훅을 아래 위치에서 호출
    const { mutateAsync: usePoints } = usePointMutation(); // 이 라인을 이동시켜서 제대로 훅을 사용할 수 있도록 처리
    const { mutateAsync: postOrder } = postOrderTb();
    const { mutateAsync: postOrderDetail } = postOrderDetailTb();
    const [usePoint, setUsePoint] = useState(location.state?.usePoint || 0);
    const [phoneNumber, setPhoneNumber] = useState(location.state?.phoneNumber || "");
    const [addOrderId, setAddOrderId] = useState(0);

    
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

            setAddOrderId(orderIdFromTb + 1);
            console.log("아악");

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
                if (mainMenu.menuCategory === "맥모닝") {
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
                        orderId: addOrderId, 
                        menuPriceId: priceInfo.menuPriceId, // 가격 ID
                        menuCount: quantity, // 수량
                        isSet: isSet? 1 : 0, // 세트 여부
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
                            orderId: addOrderId, 
                            menuPriceId: priceInfo.menuPriceId, // 가격 ID
                            menuCount: quantity, // 수량
                            isSet: isSet? 1 : 0, // 사이드는 세트 메뉴가 아니므로 false
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
                            orderId: addOrderId, 
                            menuPriceId: priceInfo.menuPriceId, // 가격 ID
                            menuCount: quantity, // 수량
                            isSet: isSet? 1 : 0, // 음료는 세트 메뉴가 아니므로 false
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
            const orderIdFromList = products[0].orderNumber;
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

            // ✅ order_tb 먼저 post (비동기 처리)
            console.log("order_tb에 보낼 데이터:", products[0].orderNumber + 1, totalPrice);
            await postOrder({ orderTempId: products[0].orderNumber + 1, totalPrice: totalPrice });

            // ✅ order_detail_tb는 order_tb가 성공한 후 실행해야 함
            console.log("order_detail_tb에 보낼 데이터:", orderDetailList);
            await postOrderDetail(orderDetailList);

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

    console.log("사용한 번호 :", phoneNumber)
    console.log("사용한 마일리지 :", usePoint)
    return (
        <>
            <header css={s.header}>
                <img src="https://static.thenounproject.com/png/3573-200.png" alt="" />
                <p>간 편 결 제</p>
            </header>
            <main css={s.main}>
                <div css={s.method}>
                    <div onClick={handlePaymentOnClick}>
                        <img src="https://miro.medium.com/v2/resize:fit:680/0*ztVd5YkRc7IiSxXu.png" alt="카카오페이" />
                    </div>
                    <div>
                        <img src="https://oopy.lazyrockets.com/api/v2/notion/image?src=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe4dc04f8-8180-4da2-b666-213378cb1138%2Ftoss_logo.png&blockId=18c0905d-e963-4698-b65f-d41c8e2bb396&width=256" alt="토스페이" />
                    </div>
                    <div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfwAG7A1D_N3jFcg7opYZcZ0gGWhF-zghxZg&s" alt="네이버페이" />
                    </div>
                    <div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpATk_8HhjpT1TfS0ARtf9LZhAThjlyyWQnf8dqVchZJs4_9o4DlbQU9t68Moz7MvF4hw&usqp=CAU" alt="삼성페이" />
                    </div>
                    <div>
                        <img src="https://biz.chosun.com/resizer/v2/LTW4BB6XXNGKXBTQIW7P574G4M.png?auth=c37b922dc0270f26327e51389d834173d33f2862117b48c1b6836e4d311b7a1a&width=616" alt="애플페이" />
                    </div>
                    <div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ77aw2ADniWhJknNT14MbOr8_KbfO7KBQ9zA&s" alt="페이코" />
                    </div>
                    <div>
                        <img src="https://www.zeropay.or.kr/images/sprite/zeropay_thumbnail.png" alt="제로페이" />
                    </div>
                    <div>
                        <img src="https://play-lh.googleusercontent.com/QAtwQ3pzH4VOo3mPNuIvS83w9cgtTKcpsCZj3UPgU8tKRK4dS1DzlsZl3wDFTAaOQPI" alt="국민페이" />
                    </div>
                </div>
            </main>
            <div css={s.foot} onClick={() => navi("/payment")}>
                <footer css={s.footer}>
                    이전 단계
                </footer>
            </div>
        </>
    );
};

export default SelectPayMethod;