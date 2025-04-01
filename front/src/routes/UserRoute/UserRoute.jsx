import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { selectedLanguageState } from '../../atoms/selectedLanguage/selectedLanguage';
import SelectMenu from '../../pages/userPages/SelectMenu/SelectMenu';
import OrderPage from '../../pages/userPages/OrderPage/OrderPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import Payment from '../../pages/userPages/Payment/Payment';
import PrePayment from '../../pages/userPages/PrePayment/PrePayment';
import SelectPayMethod from '../../pages/userPages/SelectPayMethod/SelectPayMethod';
import SavePoint from '../../pages/userPages/SavePoint/SavePoint';
import ExportOrderId from '../../pages/userPages/ExportOrderId/ExportOrderId';
import UsePoint from '../../pages/userPages/UsePoint/UsePoint';
import UserMainContainer from '../../components/common/UserMainContainer/UserMainContainer';

function UserRoute(props) {
    const selectedLanguage = useRecoilValue(selectedLanguageState); // 전역 상태 가져오기

    return (
        <UserMainContainer>
            <Routes>
                <Route path="/exportOrderId/*" element={<ExportOrderId />} /> 
                <Route path="/savePoint/*" element={<SavePoint />} /> 
                <Route path="/selectPayMethod/*" element={<SelectPayMethod />} />
                <Route path="/prePayment/*" element={<PrePayment />} />
                <Route path="/payment/*" element={<Payment />} />
                <Route path="/menu/*" element={<SelectMenu />} />
                <Route path="/order/*" element={<OrderPage />} />
                <Route path="/usePoint/*" element={<UsePoint />} />
                <Route path="/*" element={<NotFoundPage />} />
            </Routes>
        </UserMainContainer>
    );
}

export default UserRoute;
