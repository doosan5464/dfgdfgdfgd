/**@jsxImportSource @emotion/react */
import { useInfoMenuById } from '../../../queries/AdminQuery/AdminMenuBoardQuery';
import * as s from './style';
import React from 'react';

function MenuInfoMiddleModal({ menuId }) {
    const getInfoMenuById = useInfoMenuById(menuId);
    
    return (
        <div>
            <div css={s.modalhead}>
                <div><img src={getInfoMenuById?.data?.data?.singleImg} alt="" /></div>
                <span>{getInfoMenuById?.data?.data?.menuName} {getInfoMenuById?.data?.data?.size}</span>
            </div>
            <div css={s.modalbody}>
                <div css={s.text}>영양정보</div>
                <div css={s.bodyup}>
                    <div className="line">
                        <div>영양소</div>
                        <div>함량</div>
                        <div>영양소 기준치</div>
                    </div>
                    <div className="line">
                        <div>중량(g)</div>
                        <div>{getInfoMenuById?.data?.data?.weightG}g</div>
                        <div>-</div>
                    </div>
                    <div className="line">
                        <div>중량(ml)</div>
                        <div>{getInfoMenuById?.data?.data?.volumeMl}ml</div>
                        <div>-</div>
                    </div>
                    <div className="line">
                        <div>열량</div>
                        <div>{getInfoMenuById?.data?.data?.calories}kcal</div>
                        <div>-</div>
                    </div>
                    <div className="line">
                        <div>당</div>
                        <div>{getInfoMenuById?.data?.data?.sugars}g</div>
                        <div>{Math.round((getInfoMenuById?.data?.data?.sugars / 100) * 100)}%</div>
                    </div>
                    <div className="line">
                        <div>단백질</div>
                        <div>{getInfoMenuById?.data?.data?.protein}g</div>
                        <div>{Math.round((getInfoMenuById?.data?.data?.protein / 55) * 100)}%</div>
                    </div>
                    <div className="line">
                        <div>포화지방</div>
                        <div>{getInfoMenuById?.data?.data?.saturatedFat}g</div>
                        <div>{Math.round((getInfoMenuById?.data?.data?.saturatedFat / 54) * 100)}%</div>
                    </div>
                    <div className="line">
                        <div>나트륨</div>
                        <div>{getInfoMenuById?.data?.data?.sodium}mg</div>
                        <div>{Math.round((getInfoMenuById?.data?.data?.sodium / 2000) * 100)}%</div>
                    </div>
                    <div className="line">
                        <div>카페인</div>
                        <div>{getInfoMenuById?.data?.data?.caffeine}mg</div>
                        <div>{Math.round((getInfoMenuById?.data?.data?.caffeine / 400) * 100)}%</div>
                    </div>
                </div>
            </div>
            <div css={s.bodydown}>
                <div>원산지</div>
                {getInfoMenuById?.data?.data?.menuOrigin?.split('/').map((item, index) => (
                    <div key={index}>{item}</div>))
                }
            </div>
            
        </div>
    );
}

export default MenuInfoMiddleModal;