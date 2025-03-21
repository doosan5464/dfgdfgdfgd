import React, { useEffect, useState } from 'react';

const KakaoPay = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [pgToken, setPgToken] = useState(null);

    // 결제 준비 API를 호출하여 카카오페이 결제 URL을 가져오는 함수
    const handleKakaoPay = async () => {
        try {
            setLoading(true);
            const response = await fetch('/payment/ready', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
    
            if (data && data.tid) {
                window.location.href = data.next_redirect_pc_url;
            } else {
                setError('결제 준비에 실패했습니다.');
            }
        } catch (err) {
            setError('결제 준비 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // URL에서 pg_token 추출
    const getParams = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('pg_token');
    };

    useEffect(() => {
        const token = getParams();
        if (token) {
            setPgToken(token);
        }
    }, []);

    // 결제 승인 요청
    useEffect(() => {
        if (pgToken) {
            const approvePayment = async () => {
                setLoading(true);
                try {
                    const response = await fetch('/payment/approve', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ pg_token: pgToken }),
                    });
    
                    const data = await response.json();
    
                    if (data.success) {
                        setMessage('결제가 완료되었습니다!');
                        setSuccess(true);
                    } else {
                        setMessage('결제 실패!');
                    }
                } catch (err) {
                    setMessage('결제 처리 중 오류가 발생했습니다.');
                } finally {
                    setLoading(false);
                }
            };
    
            approvePayment();
        }
    }, [pgToken]);
    

    return (
        <div>
            {!pgToken ? (
                <div>
                    <button onClick={handleKakaoPay} disabled={loading}>
                        {loading ? '결제 준비 중...' : '카카오페이로 결제하기'}
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            ) : (
                <div>
                    {loading ? (
                        <p>결제 처리 중...</p>
                    ) : (
                        <p style={{ color: success ? 'green' : 'red' }}>{message}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default KakaoPay;
