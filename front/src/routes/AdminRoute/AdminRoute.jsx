import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { selectedLanguageState } from '../../atoms/selectedLanguage/selectedLanguage';
import { useRecoilValue } from "recoil";
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import LoginPage from '../../pages/adminPages/LoginPage/LoginPage';
import JoinPage from '../../pages/adminPages/JoinPage/JoinPage';
import OAuth2LoginPage from '../../pages/adminPages/OAuth2LoginPage/OAuth2LoginPage';
import { useQueryClient } from '@tanstack/react-query';
import { getTokenFromLocalStorage } from '../../configs/axiosConfig';  // 로컬 스토리지에서 토큰을 가져오는 함수

function AdminRoute(props) {
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const queryState = queryClient.getQueryState(["userMeQuery"]);

    // 로컬 스토리지에서 토큰을 가져옵니다.
    const accessToken = getTokenFromLocalStorage("AccessToken");

    useEffect(() => {
        // 토큰이 있을 경우 로그인 및 회원가입 페이지로 이동하지 못하도록 하고, /admin/main으로 리다이렉트
        if (accessToken) {
            navigate("/admin/main");
        } else if (queryState?.status === "success") {
            navigate("/admin/main");  // 로그인 성공 시 /admin/main으로 리다이렉트
        }
    }, [queryState, accessToken, navigate]);

    return (
        <Routes>
            {/* 토큰이 없는 경우에만 로그인 및 회원가입 페이지로 접근 가능 */}
            {!accessToken && (
                <>
                    <Route path="/join/*" element={<JoinPage />} />
                    <Route path="/login/*" element={<LoginPage />} />
                    <Route path='/login/oauth2' element={<OAuth2LoginPage />} />
                </>
            )}

            <Route path="/*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AdminRoute;
