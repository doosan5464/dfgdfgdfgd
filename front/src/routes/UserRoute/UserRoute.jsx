import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SelectMenu from '../../pages/userPages/SelectMenu/SelectMenu';
import OrderPage from '../../pages/userPages/OrderPage/OrderPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import { selectedLanguageState } from '../../atoms/selectedLanguage/selectedLanguage';
import { useRecoilValue } from "recoil";
import Payment from '../../pages/userPages/Payment/Payment';
import PrePayment from '../../pages/userPages/PrePayment/PrePayment';
import KaKaoPay from '../../pages/userPages/KaKaoPay/KaKaoPay';
import SavePoint from '../../pages/userPages/SavePoint/SavePoint';


function UserRoute(props) {

    const selectedLanguage = useRecoilValue(selectedLanguageState); // 전역 상태 가져오기

    return (
        <Routes>
          <Route path="/savePoint/*" element={<SavePoint />} />
          <Route path="/kakaoPay/*" element={<KaKaoPay />} />
          <Route path="/prePayment/*" element={<PrePayment />} />
          <Route path="/payment/*" element={<Payment />} />
          <Route path="/menu/*" element={<SelectMenu />} />
          <Route path="/order/*" element={<OrderPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      );
}

export default UserRoute;