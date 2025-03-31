/**@jsxImportSource @emotion/react */
import { MdInfoOutline, MdOutlineCategory, MdProductionQuantityLimits } from 'react-icons/md';
import * as s from './style';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminProductPage(props) {
    const navigate = useNavigate();

    const handleProductManageOnClick = () => {
        navigate("/admin/main/product/manage")
    }

    const handleProductInfoOnClick = () => {
        navigate("/admin/main/product/information")
    }


    return (
        <div css={s.mainContainer}>
            <div css={s.mainLayout}>
                <div css={s.conBox}>
                    <div css={s.mainCon}>
                        <div onClick={handleProductManageOnClick}>
                            <MdProductionQuantityLimits/>
                            <h5>상품 관리</h5>
                        </div>
                        <div>
                            <MdOutlineCategory />
                            <h5>카테고리 관리</h5>
                        </div>
                        <div onClick={handleProductInfoOnClick}>
                            <MdInfoOutline />
                            <h5>영양정보/원산지 관리</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProductPage;