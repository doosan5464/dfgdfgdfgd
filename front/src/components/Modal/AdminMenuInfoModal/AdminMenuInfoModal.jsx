/**@jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { useUpdateIsPosureMutation } from '../../../mutations/adminMutaion';
import { useInfoMenuById } from '../../../queries/AdminQuery/AdminMenuBoardQuery';
import * as s from './style';

function AdminMenuInfoModal({ menuId }) {

    const navigate = useNavigate();
    const getInfoMenuById = useInfoMenuById(menuId);

    console.log(getInfoMenuById);

    const updateIsExposureMutation = useUpdateIsPosureMutation(); //노출여부 뮤태이션

        //노출여부 변경 및 목록 다시 불러오기
    const handleChangeIsExposureOnClick = async (menuId, isExposure) => {
        await updateIsExposureMutation.mutateAsync({ "menuId": menuId, "isExposure": isExposure });
        getInfoMenuById.refetch();
    }
    
    //product페이지로 전달
    const handleButtonOnClick = (buttonName, menuData) => {
        if(buttonName === 'product') {
            navigate(`/admin/main/product/manage?menuId=${menuData}`);  
        }
        if(buttonName === 'info') {
            navigate(`/admin/main/option/`); 
        }
    //AdminProductManage수정할거 - 나중에 메뉴 상세정보 변경에도 사용해야댐.
    // const [ searchParams, setSearchParams ] = useSearchParams();
    // const [selectedMenu, setSelectedMenu] = useState(!!searchParams.get("menuId") ? parseInt(searchParams.get("menuId")) : 1);
    //
    //
    // return (
    //     <div css={s.container}>
    //         {/* 메뉴 선택 드롭다운 */}
    //         <div css={s.dropdownContainer}>
    //             <select
    //             onChange={(e) => setSelectedMenu(Number(e.target.value))}
    //             css={s.dropdown}
    //             value={selectedMenu}
    //             >
    }

    return (
        <div>
            <div css={s.modalcontainer}>
                <div css={s.text}>제품정보</div>
                <div css={s.modalhead}>
                    <div css={s.headleft}>
                        <div>
                            <img src={getInfoMenuById?.data?.data?.singleImg} alt="" />
                        </div>
                        <div>
                            size : {getInfoMenuById?.data?.data?.size}
                        </div>
                    </div>
                    <div css={s.headright}>
                        <div className="onoff">
                            <div>ON/OFF</div>
                            <div css={s.exBox}>
                                <input 
                                    type='checkbox' 
                                    checked={getInfoMenuById?.data?.data?.isExposure === 1}
                                    onChange={() => {
                                        const newCheckedState = getInfoMenuById?.data?.data?.isExposure === 1 ? 0 : 1;
                                        handleChangeIsExposureOnClick(getInfoMenuById?.data?.data?.menuId, newCheckedState);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="idname">
                            <div className="line">
                                <div>메뉴id</div>
                                <div>{getInfoMenuById?.data?.data?.menuId}</div>
                            </div>
                            <div className="line">
                                <div>메뉴이름</div>
                                <div>{getInfoMenuById?.data?.data?.menuName}</div>
                            </div>
                            <div className="line">
                                <div>메뉴가격</div>
                                <div>{getInfoMenuById?.data?.data?.menuPrice}</div>
                            </div>
                            <div className="line">
                                <div>카테고리</div>
                                <div>{getInfoMenuById?.data?.data?.menuCategory}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div css={s.modalbody}>
                    <div css={s.text}>제품 상세 정보</div>
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
                    <div css={s.bodydown}>
                        <div>원산지</div>
                        {getInfoMenuById?.data?.data?.menuOrigin?.split('/').map((item, index) => (
                            <div key={index}>{item}</div>))
                        }
                    </div>
                </div>
                <div css={s.modalfooter}>
                    <button onClick={() => handleButtonOnClick('product', getInfoMenuById?.data?.data?.menuId)}>제품 정보 변경</button>
                    <button onClick={() => handleButtonOnClick('info', getInfoMenuById?.data?.data?.menuId)}>제품 상세정보 변경</button>
                </div>

            </div>
        </div>
    );
}

export default AdminMenuInfoModal;

