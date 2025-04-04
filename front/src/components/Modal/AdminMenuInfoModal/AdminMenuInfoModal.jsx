/**@jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { useUpdateIsPosureMutation } from '../../../mutations/adminMutaion';
import { useInfoMenuById } from '../../../queries/AdminQuery/AdminMenuBoardQuery';
import * as s from './style';
import { useEffect, useState } from 'react';

function AdminMenuInfoModal({ setOpen, menuId }) {

    const navigate = useNavigate();
    const updateIsExposureMutation = useUpdateIsPosureMutation(); //노출여부 뮤태이션
    const [ toggledSize, setToggledSize ] = useState(0); //스위치 상태
    const [ isSize, setIsSize ] = useState("M"); //사이즈 상태
    
    const getInfoMenuById = useInfoMenuById(menuId); //메뉴정보 불러오기
    const selectedSizeMenu = getInfoMenuById.data?.data[0].menuInfo.find(item => item.size === isSize); //사이즈에 맞는 영양정보
    const selectedSizePrice = getInfoMenuById.data?.data[0].menuPrice.find(item => item.size === isSize).menuPrice; //사이즈에 맞는 가격
    //console.log(getInfoMenuById);
    // console.log(selectedSizeMenu);
    // console.log(selectedSizePrice);
    //console.log(getInfoMenuById.data?.data[0].menuPrice.length)

    useEffect( () => { //사이즈 바뀔때마다 재로딩
    }, [isSize]);

    //사이즈 변경 함수
    const sizeChangeSwitchOnClick = () => {
        setToggledSize(!toggledSize);
        setIsSize(isSize === "M" ? "L" : "M");
    }

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
            navigate(`/admin/main/product/information?menuId=${menuData}`);
        }
    
    //삭제ㄴㄴㄴ
    //AdminProductManage에 사용됨 - 나중에 메뉴 상세정보 변경에도 사용해야댐.
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
                <div css={s.headline}>
                    <div css={s.text}>제품 정보</div>
                    <button onClick={() => setOpen(false)}>닫기</button>
                </div>
                <div css={s.modalhead}>
                    <div css={s.headleft}>
                        <div>
                            {isSize === "M"
                                ? (<img src={getInfoMenuById.data?.data[0]?.singleImg} alt="" />) 
                                :  (<img src={getInfoMenuById.data?.data[0]?.setImg} alt="" />)
                            }
                        </div>
                        <div css={s.selectsize(toggledSize)}>
                            <div>size : &nbsp; {selectedSizeMenu?.size}</div>
                            {
                                getInfoMenuById.data?.data[0].menuPrice.length > 1
                                ? <label>
                                    <input type="checkbox" 
                                        checked={toggledSize} 
                                        onChange={sizeChangeSwitchOnClick}
                                    />
                                    <span></span>
                                  </label>
                                : null
                            }    
                        </div>
                    </div>
                    <div css={s.headright}>
                        <div className="onoff">
                            <div>ON/OFF</div>
                            <div css={s.exBox}>
                                <input 
                                    type='checkbox' 
                                    checked={getInfoMenuById.data?.data[0]?.isExposure === 1}
                                    onChange={() => {
                                        const newCheckedState = getInfoMenuById.data?.data[0]?.isExposure === 1 ? 0 : 1;
                                        handleChangeIsExposureOnClick(getInfoMenuById.data?.data[0]?.menuId, newCheckedState);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="idname">
                            <div className="line">
                                <div>메뉴id</div>
                                <div>{getInfoMenuById.data?.data[0]?.menuId}</div>
                            </div>
                            <div className="line">
                                <div>메뉴이름</div>
                                <div>{getInfoMenuById.data?.data[0]?.menuName}</div>
                            </div>
                            <div className="line">
                                <div>메뉴가격</div>
                                <div>{selectedSizePrice}</div>
                            </div>
                            <div className="line">
                                <div>카테고리</div>
                                <div>{getInfoMenuById.data?.data[0]?.menuCategory}</div>
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
                            <div>{selectedSizeMenu?.weight === 0 ? '-' : `${selectedSizeMenu?.weight}g`}</div>
                            <div>-</div>
                        </div>
                        <div className="line">
                            <div>중량(ml)</div>
                            <div>{selectedSizeMenu?.volume === 0 ? '-' : `${selectedSizeMenu?.volume}ml`}</div>
                            <div>-</div>
                        </div>
                        <div className="line">
                            <div>열량</div>
                            <div>{selectedSizeMenu?.calories === 0 ? '-' : `${selectedSizeMenu?.calories}kcal`}</div>
                            <div>-</div>
                        </div>
                        <div className="line">
                            <div>당</div>
                            <div>{selectedSizeMenu?.sugars === 0 ? '-' : `${selectedSizeMenu?.sugars}g`}</div>
                            <div>{selectedSizeMenu?.sugars === 0 ? '-' : `${Math.round((selectedSizeMenu?.sugars / 100) * 100)}%`}</div>
                        </div>
                        <div className="line">
                            <div>단백질</div>
                            <div>{selectedSizeMenu?.protein === 0 ? '-' : `${selectedSizeMenu?.protein}g`}</div>
                            <div>{selectedSizeMenu?.protein === 0 ? '-' : `${Math.round((selectedSizeMenu?.protein / 55) * 100)}%`}</div>
                        </div>
                        <div className="line">
                            <div>포화지방</div>
                            <div>{selectedSizeMenu?.saturatedFat === 0 ? '-' : `${selectedSizeMenu?.saturatedFat}g`}</div>
                            <div>{selectedSizeMenu?.saturatedFat === 0 ? '-' : `${Math.round((selectedSizeMenu?.saturatedFat / 54) * 100)}%`}</div>
                        </div>
                        <div className="line">
                            <div>나트륨</div>
                            <div>{selectedSizeMenu?.sodium === 0 ? '-' : `${selectedSizeMenu?.sodium}mg`}</div>
                            <div>{selectedSizeMenu?.sodium === 0 ? '-' : `${Math.round((selectedSizeMenu?.sodium / 2000) * 100)}%`}</div>
                        </div>
                        <div className="line">
                            <div>카페인</div>
                            <div>{selectedSizeMenu?.caffeine === 0 ? '-' : `${selectedSizeMenu?.caffeine}mg`}</div>
                            <div>{selectedSizeMenu?.caffeine === 0 ? '-' : `${Math.round((selectedSizeMenu?.caffeine / 400) * 100)}%`}</div>
                        </div>
                    </div>
                    <div css={s.bodydown}>
                        <div>원산지</div>
                        {
                            selectedSizeMenu?.menuOrigin === null ? (<div>---</div>) :
                            selectedSizeMenu?.menuOrigin?.split('/').map((item, index) => (<div key={index}>{item}</div>))
                        }
                    </div>
                </div>
                <div css={s.modalfooter}>
                    <button onClick={() => handleButtonOnClick('product', menuId)}>제품 정보 변경</button>
                    <button onClick={() => handleButtonOnClick('info', menuId)}>제품 상세정보 변경</button>
                </div>

            </div>
        </div>
    );
}

export default AdminMenuInfoModal;

