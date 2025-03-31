/**@jsxImportSource @emotion/react */
import axios from 'axios';
import * as s from './style';
import React, { useEffect, useState } from 'react';
0
function AdminPayMoal({ payData }) { //uuid 넘겨받기

    const [ isCancel, setIsCancel ] = useState(payData.status); //환불 여부 상태
    const [ pressTime, setPressTime ] = useState(null); //버튼 눌린 시간 상태
    const [ clickTime, setClickTime ] = useState(null); //버튼 때는 시간 상태
    const [ reasons, setReasons ] = useState(""); //결제 취소 사유 상태
    const [ pressMessage, setPressMessage ] = useState("3초이상 꾹 눌러주세요"); //버튼 메세지 상태
    
    const handleReasonInputOnChange = (e) => { //text 저장
        setReasons(e.target.value);
    }

    const handleButtonDown = () => {
        setPressTime(Date.now()); //버튼 누르는 시간 저장
        setClickTime(null); //버튼 때는 시간 초기화
    };

    const handleButtonOnClick = () => {
        setClickTime(Date.now()); //버튼 때는 시간 저장
    };

    //3초 이상 버튼 누르게하는 함수
    useEffect(() => {
        let interval;
    
        if (pressTime) {
            interval = setInterval(() =>{ //설정한 시간간격만큼 계속 반복
                const currentTime = Date.now();
                const timeDifference = currentTime - pressTime;
                const seconds = Math.floor(timeDifference / 1000);

                if(timeDifference < 3000) { //3초미만 일때 반환
                    setPressMessage(3 - seconds + "초 남았습니다");
                    if(clickTime !== null) {
                        handleCancelOnClick(timeDifference);
                        clearInterval(interval);
                    }
                } else { //3초 이상 클릭하면 환불처리
                    handleCancelOnClick(timeDifference);
                    setPressMessage("결제가 취소되었습니다");
                    clearInterval(interval);
                }
            }, 500);
            return () => clearInterval(interval);
        }
    }, [pressTime, clickTime]);

    //console.log(payData);
    //결제 취소(post)     /payments/{paymentId}/cancel
    const handleCancelOnClick = async (timeDifference) => {

        if(timeDifference < 3000) { //3초 이하면 환불 못함
            setPressMessage("3초이상 꾹 눌러주세요");
            console.log(timeDifference);
            return;
        }

        //console.log(reasons);
        //3초 이상일 때 환불 진행
        setPressMessage("결제가 취소되었습니다");
        try { //인증
            const jwtResponse = await axios.post("https://api.portone.io/login/api-secret", {
                "apiSecret": import.meta.env.VITE_PORTONE_API_KEY,
            });
            const accessToken = jwtResponse.data.accessToken;

            await axios.post( //파라미터를 통해 post요청
                `https://api.portone.io/payments/${payData.uuid}/cancel`, 
                {
                    storeId: import.meta.env.VITE_PORTONE_STOREID,
                    reason: reasons, //결제 취소 사유 적기
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );
            alert("결제 취소가 완료되었습니다");
            setIsCancel(payData.status); //결제 취소 상태 저장
            //console.log(payData.status);
        }  catch(error) {
            console.log(error);
        }
    }
    //console.log(isCancel)

    return (
        <div css={s.container}>
            <div css={s.head}>
                <div>
                    <div>주문번호</div>
                    <div>{payData.orderId}</div>
                </div>
                <div>
                    <div>결제 금액</div>
                    <div>{payData.totalAmount} 원</div>
                </div>
                <div>
                    <div>결제시간</div>
                    <div>{payData.time}</div>
                </div>
            </div>
            <div css={s.body}>
                <div>
                    <div>주문내역</div>
                    <div>{payData.orderName}</div>
                </div>
                <div>
                    <div><label htmlFor='reasonInput'>결제 취소</label></div>
                    <div>
                        <textarea id="reasonInput" type="text" 
                            value={reasons} onChange={handleReasonInputOnChange}
                            placeholder='취소 사유를 적어주세요' 
                            css={s.inputText}/>
                    </div>
                </div>
            </div>
            <div css={s.footer}>
                <div>{pressMessage}</div>
                <button onClick={handleButtonOnClick} onMouseDown={handleButtonDown} disabled={reasons === "" ? 1 : isCancel === "CANCELLED" ? 1 : 0}>결제취소</button>
            </div>

        </div>
    );
}

export default AdminPayMoal;