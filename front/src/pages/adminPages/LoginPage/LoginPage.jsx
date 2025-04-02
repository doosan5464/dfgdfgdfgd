/**@jsxImportSource @emotion/react */
import * as s from './style';
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../mutations/authMutation";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { getTokenFromLocalStorage, setTokenLocalStorage } from '../../../configs/axiosConfig';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

function LoginPage(props) {
    const loginMutation = useLoginMutation();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const [ inputValue, setInputValue ] = useState({
        adminName: "",
        adminPassword: ""
    });
    
    const handleInputOnChange = (e) => {
        setInputValue(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleLoginOnClick = async () => {
        try {
            const response = await loginMutation.mutateAsync(inputValue);
    
            // response의 data가 올바르게 반환되는지 확인
            console.log(response);  // response를 콘솔로 출력하여 실제 데이터 구조를 확인
    
            if (response?.data?.token) {
                const tokenName = response.data.name;
                const accessToken = response.data.token;
                setTokenLocalStorage(tokenName, accessToken);
    
                await Swal.fire({
                    icon: "success",
                    text: "로그인 성공",
                    timer: 1000,
                    position:"center",
                    showConfirmButton: false,
                });
                navigate("/admin/main");
                await queryClient.invalidateQueries({ queryKey: ["userMeQuery"] });
            } else {
                // token이 없으면 실패 처리
                await Swal.fire({
                    icon: "error",
                    text: "로그인 실패, 다시 시도해주세요.",
                    timer: 1500,
                    position:"center",
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            // 오류가 발생한 경우 (로그인 실패)
            console.error(error);  // 에러 내용 출력
    
            if (error.response?.status === 401 || error.response?.status === 400) {
                // 인증 오류
                await Swal.fire({
                    icon: "error",
                    text: "가입 정보를 다시 확인해주세요.",
                    timer: 1500,
                    position:"center",
                    showConfirmButton: false,
                });
            } else {
                // 서버 오류일 경우
                await Swal.fire({
                    icon: "error",
                    text: "서버 오류가 발생했습니다. 다시 시도해주세요.",
                    timer: 1500,
                    position:"center",
                    showConfirmButton: false,
                });
            }
        }
    };

    const handleKeyDown = (e, nextInputRef) => {
        if (e.key === 'Enter') {
            nextInputRef.current?.focus();  // 엔터 키가 눌렸을 때 포커스를 다음 입력 요소로 이동
        }
    };

    const passwordInputRef = React.useRef(null);



    return (
        <div css={s.layout}>
            <div css={s.logoContainer}>
                <img src="https://pngimg.com/uploads/mcdonalds/mcdonalds_PNG17.png" alt="" />
            </div>
            <div>
                <h1 css={s.title}>McDonald Admin</h1>
                <div css={s.groupBox}>
                    <input css={s.textInput} type="text" placeholder='이메일'
                        name="adminName"
                        value={inputValue.adminName}
                        onChange={handleInputOnChange}
                        onKeyDown={(e) => handleKeyDown(e, passwordInputRef)}
                    />
                </div>
                <div css={s.groupBox}>
                    <input css={s.textInput} type="password" placeholder='비밀번호'
                        ref={passwordInputRef}
                        name="adminPassword"
                        value={inputValue.adminPassword}
                        onChange={handleInputOnChange}
                        onKeyDown={(e) => e.key === 'Enter' && handleLoginOnClick()}
                    />
                </div>
                <div css={s.footerbox}>
                    <p css={s.accountMessage}>
                        <Link to={"/admin/join"}>회원가입</Link>
                    </p>
                    <button css={s.accountButton} onClick={handleLoginOnClick}>로그인</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
