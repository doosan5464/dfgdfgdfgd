import React from 'react';
/**@jsxImportSource @emotion/react */
import * as s from './style';
import { useLocation } from 'react-router-dom';

function ExportOrderId(props) {
    const location = useLocation();
    console.log("아 : ", location.state?.orderId);  // 넘긴 orderId를 확인

    return (
        <div css={s.container}>
            <div>대기번호</div>
            <div>임시번호@@</div>
            <div>영수증을 출력하시겠습니까?</div>
            <div>
                <div>예</div>
                <div>아니오</div>
            </div>
        </div>
    );
}

export default ExportOrderId;