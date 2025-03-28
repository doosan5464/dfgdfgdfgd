/**@jsxImportSource @emotion/react */
import * as s from './style';
import * as PortOne from "@portone/browser-sdk/v2";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

function AdminOrderPage(props) {
    const [ payments, setPayments ] = useState([]);

    //status의 값을 보고 메세지 띄우기
    const PAYSTATUS = { 
        "PAID": "결제완료",
        "FAILED": "결제실패",
        "CANCELLED": "결제취소",
        "READY": "결제 중"
    }

    //상품목록 더미데이터
    const orders = [
        {
            orderId: 1024,
            products: [
                {
                    productId: 1,
                    productName: "빅맥",
                    price: 5500,
                    category: "버거",
                    count: 3,
                },
                {
                    productId: 30,
                    productName: "후렌치후라이",
                    price: 1100,
                    category: "사이드",
                    count: 1,
                },
                {
                    productId: 55,
                    productName: "코카콜라",
                    price: 1300,
                    category: "음료",
                    count: 1,
                },
            ]
        },
        {
            orderId: 4025,
            products: [
                {
                    productId: 3,
                    productName: "1955버거",
                    price: 6400,
                    category: "버거",
                    count: 1,
                },
                {
                    productId: 55,
                    productName: "코카콜라",
                    price: 1900,
                    category: "음료",
                    count: 1,
                },
                {
                    productId: 100,
                    productName: "콜라L",
                    price: 2400,
                    category: "음료",
                    count: 1,
                },
            ]
        },
        {
            orderId: 4026,
            products: [
                {
                    productId: 2,
                    productName: "맥스파이시 상하이버거",
                    price: 5500,
                    category: "버거",
                    count: 1,
                },
            ]
        }
    ]
    //const foundorder = orders[0]; //입력ID와 세팅ID비교
    //console.log(foundorder);
    // console.log(foundorder.products[0].productName);
    // const nameOfProducts = foundorder.products.map(product => product.productName).join(", ");
    // console.log(nameOfProducts);

    //중간 단계 => db의 자료에 맞게 결제 후 리스트 띄우기 
    //주문 번호 중에 하나 선택 => 주문 번호 안의 물품을 products에 map하기
    // 물품구입 - payone으로 보내기
    const handlePaymentClick = async (orderId) => {
        const foundorder = orders.find(o => o.orderId === orderId); //주문번호로 찾기
        const nameOfProducts = foundorder.products.map(product => 
            product.productName + " " + product.count + "개").join(", "); //제품 이름 나열
        const SumPrice = foundorder.products.reduce((sum, product) => {
            return sum + (product.price * product.count);}, 0); //초기값 0의 모든 제품 합산 가격
        try {
            const paymentResponse = await PortOne.requestPayment({ //payone에 정보 입력
                storeId: import.meta.env.VITE_PORTONE_STOREID,
                paymentId: uuid(),
                orderName: nameOfProducts, //제품 이름 나열
                totalAmount: SumPrice, //총가격
                currency: "CURRENCY_KRW",
                payMethod: "EASY_PAY",
                channelKey: "channel-key-880a138a-b3ba-4ad9-9135-791ff84b4e76",
                customer: { //주문번호 집어넣음
                    customerId: foundorder.orderId.toString(),
                    fullName: foundorder.orderId.toString(),
                },
                products: //map에 담겨 return되는 값 자체가 배열이라서 [] 생략
                    foundorder.products.map( p => {
                        return {
                            id: p.productId.toString(),
                            name: p.productName,
                            amount: p.price,
                            quantity: p.count,
                            tag: p.category
                        };
                    }),
            });
            console.log(paymentResponse);
        }  catch(error) {
            console.log(error);
        }
    }

    //결제 내역 받기 - payone에서 받기
    const handleSearchClick = async () => {
        //접근 권한, 토큰
        const jwtResponse = await axios.post("https://api.portone.io/login/api-secret", {
            "apiSecret": import.meta.env.VITE_PORTONE_API_KEY,
        });
        const accessToken = jwtResponse.data.accessToken;

        //결제 내역 받기
        const paymentsResponse = await axios.get("https://api.portone.io/payments", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                requsetBody: JSON.stringify({
                    page: { //결제내역 페이지설정
                        number: 0,
                        size: 10,
                    },
                    filter: { //결제 내역 필터링
                        storeId: import.meta.env.VITE_PORTONE_STOREID,
                        isTest: true,
                        timestampType: "CREATED_AT",
                        from: `${dataFilter}T00:00:00Z`,
                        untill: `${dateFilter}T23:59:59Z`,
                        //timestampType: "CREATED_AT",
                        //start: "2024-09-28T00:00:00+09:00",//`${dataFilter}T00:00:00Z`,
                        //end: "2025-03-26T08:58:33+09:00"//`${dateFilter}T23:59:59Z`,
}
                }),
            }
        });

        console.log(paymentsResponse); //paymentsResponse => data => items
        
        //결제 내역 값 세팅
        setPayments(paymentsResponse.data.items.map(item => ({
            status: item.status,
            mid: item.merchantId,
            orderId: item.customer.id,
            orderName: item.orderName,
            totalAmount: item.amount.total,
        })));
    }




    //날짜 선택
    const today = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); //padStart로 2자리수로 만들기
        const today = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${today}`;
    }

    const [selectedDate, setSelectedDate ] = useState(today());

    const handleSelectDateOnChange = (e) => {
        setSelectedDate(e.target.value);
    }

    return (
        <div css={s.container}>
            <div css={s.upside}>
                <span>매출관리</span>
                <span>새로고침</span>
                <label htmlFor="date">날짜를 선택하세요</label>
                <div css={s.calandar}>
                    <input type="date"
                    id="date"
                    max={today()}
                    value={selectedDate}
                    onChange={handleSelectDateOnChange}
                    />
                </div>
            </div>  

            <div css={s.midside}>
                <div css={s.listcontainer}>
                    <div css={s.listhead}>
                        <span className="orderid">주문번호</span>
                        <span className="mid">MID</span>
                        <span className="ordername">주문명</span>
                        <span className="totalamount">총액</span>
                        <span className="status">결제상태</span>
                    </div>
                    {
                        payments.map(p =>
                            <div css={s.listbody}>
                                <span>{p.orderId}</span>
                                <span>{p.mid}</span>
                                <span>{p.orderName}</span>
                                <span>{p.totalAmount}</span>
                                <span><button>{PAYSTATUS[p.status]}</button></span>
                            </div>
                        )
                    }
                </div>
            </div>
            
            <div>
                <button onClick={handleSearchClick}>조회</button>
                    {
                        orders.map(o => 
                            <div key={o.orderId}>
                                {o.products.map(p =>
                                    <div key={p.productId}>
                                        {"상품명:" + p.productName + ", 가격: " + p.price}
                                        <br />
                                    </div>
                                )}
                                <button onClick={() => handlePaymentClick(o.orderId)}>구매하기</button>
                            </div>
                        )
                    }
                </div>
        </div>
    );
}

export default AdminOrderPage;