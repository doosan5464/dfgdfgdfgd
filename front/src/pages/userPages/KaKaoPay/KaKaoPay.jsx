import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { addedCart } from '../../../atoms/addedCart/addedCart';
import * as PortOne from "@portone/browser-sdk/v2"; // PortOne 결제 SDK
import { v4 as uuid } from 'uuid'; // UUID 라이브러리
/**@jsxImportSource @emotion/react */
import * as s from './style';

const KakaoPay = () => {
    const [payments, setPayments] = useState([]); // 결제 목록을 저장하는 상태

    // 결제 상태를 한글로 매핑
    const PAYSTAUTS = {
        "PAID": "결제 완료",
        "FAILED": "결제 실패",
    };

    // 장바구니 상태 관리
    const [addedCartState, setAddedCartState] = useRecoilState(addedCart);

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

            console.log("푸하 : ", paymentResponse)

        } catch (error) {
            console.log(error); // 결제 요청 중 에러 발생 시 출력
        }
    };



    return (
        <div css={s.container}>
            <div css={s.header}>
                {/* 결제 요청 버튼 */}
                <p onClick={handlePaymentOnClick}>결제하기</p>
            </div>
        </div>
    );
};

export default KakaoPay;
