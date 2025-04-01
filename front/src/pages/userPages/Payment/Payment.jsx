/**@jsxImportSource @emotion/react */
import { useLocation, useNavigate } from 'react-router-dom';
import * as s from './style';
import { useState } from 'react';


function Payment(props) {
    const navi = useNavigate();
    const location = useLocation();

    const [usePoint, setUsePoint] = useState(location.state?.usePoint || 0);
    const [phoneNumber, setPhoneNumber] = useState(location.state?.phoneNumber || "");

    const handleEasyPay = () => {
        navi("/selectPayMethod", { state: { 
                        usePoint: usePoint,
                        phoneNumber: phoneNumber
                    }
                 });
    }

    const handleBack = () => {
        navi("/prePayment")
    }

    return (
        <>
            <header>

            </header>
            <main css={s.main}>
                <div css={s.method}>
                    <div>
                        <img src="https://png.pngtree.com/png-vector/20221113/ourmid/pngtree-credit-card-payment-png-image_6443984.png" alt="" />
                        <div>
                            <p>카드결제</p>
                            <p>(CreditCard)</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://img.khan.co.kr/news/2023/11/23/news-p.v1.20231123.9a9908bef5904a3cab46a5afc2bce234_P1.jpg" alt="" />
                        <div onClick={handleEasyPay}>
                            <p>간편결제</p>
                            <p>(SmartPay)</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://img.freepik.com/premium-vector/gift-card-icon-flat-style-discount-coupon-vector-illustration-isolated-background-bonus-certificate-sign-business-concept_157943-712.jpg" alt="" />
                        <div>
                            <p>상품권</p>
                            <p>(Voucher)</p>
                        </div>
                    </div>
                </div>
            </main>
            <footer css={s.footer} onClick={handleBack}>
                이전 단계
            </footer>
        </>
    );
}

export default Payment;