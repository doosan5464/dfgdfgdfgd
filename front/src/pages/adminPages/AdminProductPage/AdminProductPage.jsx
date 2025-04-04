/**@jsxImportSource @emotion/react */
import { MdInfoOutline, MdOutlineCategory, MdProductionQuantityLimits } from 'react-icons/md';
import * as s from './style';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../../components/common/AdminHeader/AdminHeader';

function AdminProductPage(props) {
    const navigate = useNavigate();

    const handleProductManageOnClick = () => {
        navigate("/admin/main/product/manage")
    }

    const handleCategoryOnClick = () => {
        navigate("/admin/main/product/category")
    }

    const handleProductInfoOnClick = () => {
        navigate("/admin/main/product/information")
    }

    return (
        <>
            <AdminHeader title={"제품 관리"} />
            <div css={s.mainCon}>
                <div css={s.content} onClick={handleProductManageOnClick}>
                    <img src="https://github.com/hz-uiw/project_img/blob/master/mcdonald_kiosk_project/admin_menu_productManage.png?raw=true" alt="" />
                </div>
                <div css={s.content} onClick={handleCategoryOnClick}>
                    <img src="https://github.com/hz-uiw/project_img/blob/master/mcdonald_kiosk_project/admin_menu_category.png?raw=true" alt="" />
                </div>
                <div css={s.content} onClick={handleProductInfoOnClick}>
                    <img src="https://github.com/hz-uiw/project_img/blob/master/mcdonald_kiosk_project/admin_menu_nutrition&origin.png?raw=true" alt="" />
                </div>
            </div>
        </>
    );
}

export default AdminProductPage;