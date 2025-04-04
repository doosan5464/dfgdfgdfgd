/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useUpdateNicknameMutation } from "../../../mutations/accountMutation";
import { useUserMeQuery } from "../../../queries/userQuery";
import * as s from "./style";
import PasswordModal from "../../../components/Modal/AuthModal/PasswordModal/PasswordModal";
import ChangeEmailModal from "../../../components/Modal/AuthModal/ChangeEmailModal/ChangeEmailModal";
import AdminHeader from "../../../components/common/AdminHeader/AdminHeader";

function AdminMyPage() {
    const loginUser = useUserMeQuery();
    const updateNicknameMutation = useUpdateNicknameMutation();

    const [tradeNameValue, setTradeNameValue] = useState("");
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [emailModalOpen, setEmailModalOpen] = useState(false);

    useEffect(() => {
        setTradeNameValue(loginUser?.data?.data.tradeName || "");
    }, [loginUser.isFetched]);

    const handleNicknameInputOnChange = (e) => {
        setTradeNameValue(e.target.value);
    };

    const handleSaveNicknameButtonOnClick = async () => {
        await updateNicknameMutation.mutateAsync(tradeNameValue);
        loginUser.refetch();
    };

    //실험용
    

    return (
        <>
            <AdminHeader title={"내정보"} />
            <div css={s.container}>
                <div css={s.conWrap}>
                    <div css={s.infoContainer}>
                        <div css={s.infoBox}>
                            <h3>관리자 아이디</h3>
                            <p css={s.infoText}>{loginUser?.data?.data.adminName}</p>
                        </div>

                        <div css={s.infoBox}>
                            <h3>매장 이름</h3>
                            <div css={s.infoRow}>
                                <input
                                    css={s.inputField}
                                    type="text"
                                    value={tradeNameValue}
                                    onChange={handleNicknameInputOnChange}
                                />
                                <button
                                    css={s.primaryButton}
                                    onClick={handleSaveNicknameButtonOnClick}
                                    disabled={loginUser?.data?.data.tradeName === tradeNameValue}
                                >
                                    변경하기
                                </button>
                            </div>
                        </div>

                        <div css={s.infoBox}>
                            <h3>이메일</h3>
                            <div css={s.infoRow}>
                                <p css={s.infoText}>{loginUser?.data?.data.email}</p>
                                <button css={s.secondaryButton} onClick={() => setEmailModalOpen(true)}>
                                    이메일 변경하기
                                </button>
                            </div>
                        </div>

                        {!loginUser?.data?.data?.oauth2Name && (
                            <div css={s.infoBox}>
                                <h3>비밀번호</h3>
                                <div css={s.infoRow}>
                                    <p css={s.infoText}>계정에 로그인할 비밀번호를 설정합니다.</p>
                                    <button css={s.secondaryButton} onClick={() => setPasswordModalOpen(true)}>
                                        비밀번호 변경하기
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 이메일 변경 모달 */}
            <ReactModal
                isOpen={emailModalOpen}
                onRequestClose={() => setEmailModalOpen(false)}
                style={s.modalStyle}
            >
                <ChangeEmailModal setOpen={setEmailModalOpen} />
            </ReactModal>

            {/* 비밀번호 변경 모달 */}
            <ReactModal
                isOpen={passwordModalOpen}
                onRequestClose={() => setPasswordModalOpen(false)}
                style={s.modalStyle}
            >
                <PasswordModal setOpen={setPasswordModalOpen} />
            </ReactModal>
        </>
    );
}

export default AdminMyPage;
