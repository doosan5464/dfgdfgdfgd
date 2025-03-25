/**@jsxImportSource @emotion/react */
import { useInfoMenuById } from '../../../queries/AdminQuery/AdminMenuBoardQuery';
import * as s from './style';
import React from 'react';

function AdminMenuInfoModal({ menuId }) {
    const getInfoMenuById = useInfoMenuById();
    console.log(getInfoMenuById);


    return (
        <div>
            <div css={s.modalcontainer}>
                <div css={s.modalhead}>
                    <div>메뉴id</div>
                    <div>메뉴이름</div>
                    <div>메뉴가격</div>
                    <div>카테고리</div>
                    <div>ON/OFF</div>
                </div>
                <div css={s.modalbody}>
                    <div css={s.bodyleft}>
                        <div>메뉴이미지</div>
                        <div>
                            <div>size : </div>
                            <div></div>
                        </div>
                    </div>
                    <div css={s.bodyright}>
                        <div>
                            <div>영양소</div>
                            <div>중량(g)</div>
                            <div>중량(ml)</div>
                            <div>열량</div>
                            <div>당</div>
                            <div>단백질</div>
                            <div>포화지방</div>
                            <div>나트륨</div>
                            <div>카페인</div>
                        </div>
                        <div>
                            <div>함량</div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div>
                            <div>영양소 기준치</div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div css={s.modalfooter}>

                </div>

            </div>
        </div>
    );
}

export default AdminMenuInfoModal;

