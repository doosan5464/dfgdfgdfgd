import React, { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { addedCart } from '../../../atoms/addedCart/addedCart';
import * as PortOne from "@portone/browser-sdk/v2"; // PortOne 결제 SDK
import { v4 as uuid } from 'uuid'; // UUID 라이브러리
/**@jsxImportSource @emotion/react */
import * as s from './style';
import { useNavigate } from 'react-router-dom';

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

const KakaoPay = () => {
    const navi = useNavigate();

    const handleOnClickNext = () => {
        navi("/payment")
    }

    // 장바구니 상태 관리
    const [addedCartState] = useRecoilState(addedCart);

    // 첫 번째 메뉴 이름을 기준으로 "버거 및 외 n개" 형식으로 상품명 설정
    const productNames = addedCartState.map((item) => item.detailMenu);
    const productName = `${productNames[0]} 및 외 ${addedCartState.length - 1}개`; // 첫 번째 메뉴 이름 + 나머지 개수

    // 장바구니의 가격 합산
    const totalPrice = addedCartState.reduce((sum, item) => sum + item.detailPrice, 0); // 모든 상품 가격 합산

    // 결제 상품 리스트 생성
    const products = addedCartState.map((item) => ({
        orderId: Math.min(addedCartState.length * 1000, 9000) + (addedCartState.length - 1), // 1000부터 시작, 1씩 증가
        productName: item.detailMenu,
        price: item.detailPrice,
    }));

    // 결제 요청 함수
    const handlePaymentOnClick = async () => {
        try {
            // PortOne 결제 요청
            const paymentResponse = await PortOne.requestPayment({
                storeId: import.meta.env.VITE_PORTONE_STOREID, // 환경 변수에서 가져온 상점 ID
                paymentId: uuid(), // UUID를 사용해 유니크한 결제 ID 생성
                orderName: productName, // "버거 및 외 n개" 형식으로 주문명 설정
                totalAmount: totalPrice, // 합산된 가격
                currency: "CURRENCY_KRW", // 결제 통화 (원화)
                payMethod: "EASY_PAY", // 간편결제 방식 사용
                channelKey: "channel-key-39a34f05-a2cb-44f1-a0ca-0798cf19bca2", // PortOne 채널 키
                products: products.map(product => ({
                    id: product.orderId.toString(), // 상품 ID
                    name: product.productName, // 상품명
                    amount: product.price, // 상품 가격
                    quantity: 1, // 수량
                })),
            });

            // 포인트 적립 처리
            const point = Math.floor(totalPrice * 0.05);  // 5% 포인트 계산
            console.log("마일리지 금액 : ", point);

            navi("/savePoint", { state: { point: point, orderId: products[0].orderId } }); // state로 넘김

            // 여기서 order_detail_tb에 보내야 함 (장바구니 초기화 하기 전에)
            console.log("주문번호 : ", products);
            console.log("임시 주문번호 : ", products[0].orderId);


            // 장바구니 상태 초기화
            // const resetCart = useResetRecoilState(addedCart);

            // 장바구니 완전 초기화
            // resetCart();

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

export default KakaoPay;