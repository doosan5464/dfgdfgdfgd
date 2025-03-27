/**@jsxImportSource @emotion/react */
import * as s from './style';
import React, { useState } from 'react';

function AdminOrderPage(props) {
    const [ payments, setPayments ] = useState([]);

    const PAYSTATUS = { //status의 값을 보고 메세지 띄우기
        "PAID": "결제완료",
        "FAILED": "결제실패",
        "CANCELLED": "결제취소",
        "READY": "결제 중"
    }

    const products = {

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
            <div css={s.head}>
                <span>매출관리</span>
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

            <div>
                표, 리스트
            </div>
        </div>
    );
}

export default AdminOrderPage;