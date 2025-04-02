import React from 'react';
/**@jsxImportSource @emotion/react */
import * as s from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { addedCart } from '../../../atoms/addedCart/addedCart';  // Recoil 상태 import

function ExportOrderId(props) {
    const navi = useNavigate();
    const location = useLocation();
    const [, setAddedCartState] = useRecoilState(addedCart);  // Recoil 상태 업데이트용

    const handleGoFirst = () => {
        // Recoil 상태를 비워줍니다 (장바구니 비우기)
        setAddedCartState([]);  // 장바구니 비우기

        // 메뉴 페이지로 이동
        navi("/menu");
    };

    return (
        <>
            <div css={s.head}>대기번호</div>
            <div css={s.num}>
                {location.state?.orderId}
            </div>
            <div>영수증을 출력하시겠습니까?</div>
            <div>
                <div onClick={handleGoFirst}>예</div>
                <div onClick={handleGoFirst}>아니오</div>
            </div>
        </>
    );
}

export default ExportOrderId;
