/**@jsxImportSource @emotion/react */
import { useInfoMenuById } from '../../../queries/AdminQuery/AdminMenuBoardQuery';
import * as s from './style';
import React from 'react';

function MenuDetailInfoModal({ setOpen, menuId }) {
    //props에 기본적으로, 내가 대입한 값과 setOpen이 객체로서 같이 온다.
    //따라서 setOpen을 값을 넣지 않았어도, 기본적으로 존재한다.

    const getInfoMenuById = useInfoMenuById(menuId);
    //console.log(getInfoMenuById);
    // console.log(menuId);
    // console.log(setOpen);
    
    return (
        <div>
            <div css={s.modalhead}>
                <div><img src={getInfoMenuById?.data?.data?.singleImg} alt="" /></div>
                <span>{getInfoMenuById?.data?.data?.menuName} {getInfoMenuById?.data?.data?.size}</span>
            </div>
            <div css={s.modalbody}>
                <div css={s.text1}>영양정보</div>
                <div css={s.bodyup}>
                    <div className="line">
                        <div>영양소</div>
                        <div>함량</div>
                        <div>영양소 기준치</div>
                    </div>
                    <div className="line">
                        <div>중량(g)</div>
                        <div>{getInfoMenuById?.data?.data?.weightG === 0 ? '-' : `${getInfoMenuById?.data?.data?.weightG}g`}</div>
                        <div>-</div>
                    </div>
                    <div className="line">
                        <div>중량(ml)</div>
                        <div>{getInfoMenuById?.data?.data?.volumeMl === 0 ? '-' : `${getInfoMenuById?.data?.data?.volumeMl}ml`}</div>
                        <div>-</div>
                    </div>
                    <div className="line">
                        <div>열량</div>
                        <div>{getInfoMenuById?.data?.data?.calories === 0 ? '-' : `${getInfoMenuById?.data?.data?.calories}kcal`}</div>
                        <div>-</div>
                    </div>
                    <div className="line">
                        <div>당</div>
                        <div>{getInfoMenuById?.data?.data?.sugars === 0 ? '-' : `${getInfoMenuById?.data?.data?.sugars}g`}</div>
                        <div>{getInfoMenuById?.data?.data?.sugars === 0 ? '-' : `${Math.round((getInfoMenuById?.data?.data?.sugars / 100) * 100)}%`}</div>
                    </div>
                    <div className="line">
                        <div>단백질</div>
                        <div>{getInfoMenuById?.data?.data?.protein === 0 ? '-' : `${getInfoMenuById?.data?.data?.protein}g`}</div>
                        <div>{getInfoMenuById?.data?.data?.protein === 0 ? '-' : `${Math.round((getInfoMenuById?.data?.data?.protein / 55) * 100)}%`}</div>
                    </div>
                    <div className="line">
                        <div>포화지방</div>
                        <div>{getInfoMenuById?.data?.data?.saturatedFat === 0 ? '-' : `${getInfoMenuById?.data?.data?.saturatedFat}g`}</div>
                        <div>{getInfoMenuById?.data?.data?.saturatedFat === 0 ? '-' : `${Math.round((getInfoMenuById?.data?.data?.saturatedFat / 54) * 100)}%`}</div>
                    </div>
                    <div className="line">
                        <div>나트륨</div>
                        <div>{getInfoMenuById?.data?.data?.sodium === 0 ? '-' : `${getInfoMenuById?.data?.data?.sodium}mg`}</div>
                        <div>{getInfoMenuById?.data?.data?.sodium === 0 ? '-' : `${Math.round((getInfoMenuById?.data?.data?.sodium / 2000) * 100)}%`}</div>
                    </div>
                    <div className="line">
                        <div>카페인</div>
                        <div>{getInfoMenuById?.data?.data?.caffeine === 0 ? '-' : `${getInfoMenuById?.data?.data?.caffeine}mg`}</div>
                        <div>{getInfoMenuById?.data?.data?.caffeine === 0 ? '-' : `${Math.round((getInfoMenuById?.data?.data?.caffeine / 400) * 100)}%`}</div>
                    </div>
                </div>
            </div>
            <div css={s.bodydown}>
                <div css={s.text2}>원산지</div>
                <div css={s.origin}>
                    {getInfoMenuById?.data?.data?.menuOrigin?.split('/').map((item, index) => (
                        <div key={index}>{item}</div>))
                    }
                </div>
            </div>
            <div css={s.footer}>
                <button onClick={() => setOpen(false)}>뒤로가기</button>
            </div>
        </div>
    );
}

export default MenuDetailInfoModal;