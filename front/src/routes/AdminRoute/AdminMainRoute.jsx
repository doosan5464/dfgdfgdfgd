import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainSidebar from '../../components/common/MainSidebar/MainSidebar';
import MainContainer from '../../components/common/MainContainer/MainContainer';
import AdminMenuPage from '../../pages/adminPages/AdminMenuPage/AdminMenuPage';
import AdminProductPage from '../../pages/adminPages/AdminProductPage/AdminProductPage';
import AdminOptionPage from '../../pages/adminPages/AdminOptionPage/AdminOptionPage';
import AdminAccountPage from '../../pages/adminPages/AdminAccountPage/AdminAccountPage';
import AdminOrderPage from '../../pages/adminPages/AdminOrderPage/AdminOrderPage';
import AdminSalesPage from '../../pages/adminPages/AdminSalesPage/AdminSalesPage';
import AdminProductManage from '../../pages/adminPages/AdminProductManage/AdminProductManage';
import AdminMyPage from '../../pages/adminPages/AdminMyPage/AdminMyPage';
import AdminMainPage from '../../pages/adminPages/AdminMainPage/AdminMainPage';
import AdminProductInfo from '../../pages/adminPages/AdminProductInfo/AdminProductInfo';
import AdminCategoryPage from '../../pages/AdminCategoryPage/AdminCategoryPage';

function AdminMainRoute(props) {
    return (
        <>
            <MainSidebar />
            <MainContainer>
                    <Routes>
                        <Route path='/menu' element={<AdminMenuPage />} />
                        <Route path='/' element={<AdminMainPage />} />
                        <Route path='/product' element={<AdminProductPage />} />
                        <Route path='/product/manage' element={<AdminProductManage />} />
                        <Route path='/product/information' element={<AdminProductInfo />} />
                        <Route path='/product/category' element={<AdminCategoryPage />} />
                        <Route path='/option' element={<AdminOptionPage />} />
                        <Route path="/sale/*" element={<AdminSalesPage />} />
                        <Route path='/order' element={<AdminOrderPage />} />
                        <Route path='/mypage' element={<AdminMyPage />} />
                        <Route path='/account' element={<AdminAccountPage />} />
                    </Routes>
            </MainContainer>
        </>
    );
}

export default AdminMainRoute;
