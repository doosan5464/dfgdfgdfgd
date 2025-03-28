/**@jsxImportSource @emotion/react */
import * as s from './style';
import * as PortOne from "@portone/browser-sdk/v2";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { IoRefreshOutline } from 'react-icons/io5';
import { MdNavigateBefore, MdNavigateNext, MdOutlineRefresh } from 'react-icons/md';
import { data, useSearchParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

//결제 조회 페이지
function AdminOrderPage(props) {
    const [ payments, setPayments ] = useState([]); //결제 내역 상태

    const [ searchParams, setSearchParams ] = useSearchParams(); //url파라미터
    const [ totalCount, setTotalCount ] = useState(0); //결제 내역 갯수 상태
    const [ totalPages, setTotalPages ] = useState(1); //총 페이지 수 상태
    const [ pageNumbers, setPageNumbers ] = useState([]); //페이지 번호 목록 상태
    const page = parseInt(searchParams.get("page") || "1"); //현재 페이지 번호

    const handlePageNumbersOnClick = (pageNumber) => { //클릭된 페이지 번호로 파라미터 적용
        searchParams.set("page", pageNumber);
        setSearchParams(searchParams);
    }

    //오늘 날짜 계산
    const today = () => { 
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); //padStart로 2자리수로 만들기
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const [selectedDate, setSelectedDate ] = useState(today()); //날짜 상태 (기본값 오늘)

    //달력에 선택된 값으로 변경
    const handleSelectDateOnChange = (e) => { 
        searchParams.set("page", 1); //1페이지로 파라미터 값 변경
        setSearchParams(searchParams); //파라미터 업데이터
        setSelectedDate(e.target.value); //달력값 상태 업데이트
    }

    //페이지 메커니즘
    useEffect( () => {
        if(totalCount > 0) {
            const totalPage = Math.ceil(totalCount / 10); //총페이지 수 계산
            setTotalPages(totalPage);

            const pageStartIndex = Math.floor((page - 1) / 5) * 5 + 1; //페이지 목록 시작 번호
            const pageEndIndex = pageStartIndex + 4 > totalPage ? totalPage : pageStartIndex + 4; //페이지 목록 끝 번호
            
            let newpageNumbers = []; //페이지번호 목록 생성
            for(let i = pageStartIndex; i <= pageEndIndex; i++) {
                newpageNumbers = [...newpageNumbers, i];
            }
            setPageNumbers(newpageNumbers); //페이지번호 목록 상태 갱신
            //console.log("리패치");
            //console.log(payments);
        } 
    }, [totalCount, page]);





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
    //console.log(foundorder);

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
    useEffect(() => {
        const fetchPayments = async () => {
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
                    requestBody: JSON.stringify({
                        page: { //결제내역 페이지설정
                            number: page - 1, //페이지 번호 인덱스
                            size: 10, //한 페이지에 담길 수
                        },
                        filter: { //결제 내역 필터링
                            storeId: import.meta.env.VITE_PORTONE_STOREID,
                            isTest: true,
                            timestampType: "CREATED_AT",
                            from: `${selectedDate}T00:00:00Z`, //"2024-09-28T00:00:00Z", //`${selectedDate}T00:00:00Z`,
                            until: `${selectedDate}T23:59:59Z`, //"2025-03-28T23:59:59Z", //`${selectedDate}T23:59:59Z`,
                        },
                        
                    }),
                }
            });
            //console.log(paymentsResponse);
            setTotalCount(paymentsResponse.data.page.totalCount); // 총페이지 수 받기
            
            //결제 내역 값 세팅
            setPayments(paymentsResponse.data.items.map(item => ({
                status: item.status,
                mid: item.merchantId,
                uuid: item.id,
                orderId: item.customer.name,
                orderName: item.orderName,
                totalAmount: item.amount.total,
            })));
            //console.log(payments);
        }
        fetchPayments();
    }, [page, selectedDate, totalCount]);


    console.log(payments);
    // 결제 취소
    // post
    // /payments/{paymentId}/cancel
    const handleCandleClick = async (uuid) => {
        console.log(uuid)
        const foundorder = payments.find(o => o.uuid === uuid); //uuid로 찾기
        try {
            const jwtResponse = await axios.post("https://api.portone.io/login/api-secret", {
                "apiSecret": import.meta.env.VITE_PORTONE_API_KEY,
            });
            const accessToken = jwtResponse.data.accessToken;

            await axios.post(
                `https://api.portone.io/payments/${uuid}/cancel`, 
                {
                    storeId: import.meta.env.VITE_PORTONE_STOREID,
                    reason: "취소사유",
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );
            alert("취소완료")
        }  catch(error) {
            console.log(error);
        }
    }

    return (
        <div css={s.container}>
            <div css={s.upside}>
                <span>결제 내역</span>
                <div>
                    <label htmlFor="date" />
                    <div css={s.calandar}>
                        <input type="date"
                        id="date"
                        max={today()} //최대값 오늘
                        value={selectedDate} //기본값 오늘
                        onChange={handleSelectDateOnChange}
                        />
                    </div>
                    <button><MdOutlineRefresh size={24} fill="#444444" /></button>
                </div>
            </div>  

            <div css={s.listcontainer}>
                <div css={s.listhead}>
                    <span className="orderid">주문번호</span>
                    <span className="ordername">주문명</span>
                    <span className="totalamount">총액</span>
                    <span className="mid">MID</span>
                    <span className="status">결제상태</span>
                </div>
                {
                    payments.map(p =>
                        <div css={s.listbody}>
                            <span className="orderid">{p.orderId}</span>
                            <span className="ordername">{p.orderName}</span>
                            <span className="totalamount">{p.totalAmount}</span>
                            <span className="mid">{p.mid}</span>
                            <span className="status">
                                <button css={s.statusbutton(p.status)} onClick={() => handleCandleClick(p.uuid)}>
                                    {PAYSTATUS[p.status]}
                                </button>
                            </span>
                        </div>
                    )
                }
            </div>

            <div css={s.footer}>
                <button disabled={page === 1} onClick={() => handlePageNumbersOnClick(page - 1)}>
                    <MdNavigateBefore />
                </button>
                {
                    pageNumbers.map(number => 
                        <button key={number} css={s.pageNum(page === number)} onClick={() => handlePageNumbersOnClick(number)}>
                            <span>{number}</span>
                        </button>
                    )
                }
                <button disabled={page === totalPages} onClick={() => handlePageNumbersOnClick(page + 1)}>
                    <MdNavigateNext />
                </button>
            </div>
        
            <div>
                ===더미데이터용===
                {/* <button onClick={handleSearchClick}>조회</button> */}
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