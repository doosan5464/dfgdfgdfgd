import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SelectMenu from '../../pages/userPages/SelectMenu/SelectMenu';
import OrderPage from '../../pages/userPages/OrderPage/OrderPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import { selectedLanguageState } from '../../atoms/selectedLanguage/selectedLanguage';
import { useRecoilValue } from "recoil";


function UserRoute(props) {

    const selectedLanguage = useRecoilValue(selectedLanguageState); // 전역 상태 가져오기

    return (
        <Routes>
          <Route path="/menu/*" element={<SelectMenu />} />
          <Route path="/order/*" element={<OrderPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      );
}

export default UserRoute;