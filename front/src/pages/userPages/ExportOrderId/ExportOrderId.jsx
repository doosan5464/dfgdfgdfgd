import React from 'react';
/**@jsxImportSource @emotion/react */
import * as s from './style';
import { useLocation, useNavigate } from 'react-router-dom';

function ExportOrderId(props) {
    const navi = useNavigate();

    const location = useLocation();
    console.log("주문번호는? : ", location.state?.orderId);  // 넘긴 orderId를 확인

    const handleGoFirst = () => {
        navi("/menu");
    }

    return (
        <div css={s.container}>
            <div css={s.head}>대기번호</div>
            <div css={s.num}>
                {location.state?.orderId}
            </div>
            <div>영수증을 출력하시겠습니까?</div>
            <div>
                <div onClick={handleGoFirst}>예</div>
                <div onClick={handleGoFirst}>아니오</div>
            </div>
        </div>
    );
}

export default ExportOrderId;