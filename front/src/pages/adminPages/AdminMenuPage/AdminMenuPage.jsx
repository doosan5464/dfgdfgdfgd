/**@jsxImportSource @emotion/react */
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import * as s from './style';
import React, { useEffect, useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useAllMenuList, useGetCategories } from '../../../queries/AdminQuery/AdminMenuBoardQuery';
import { useUpdateIsPosureMutation } from '../../../mutations/adminMutaion';
import ReactModal from 'react-modal';
import AdminMenuInfoModal from '../../../components/Modal/AdminMenuInfoModal/AdminMenuInfoModal';

function AdminMenuPage(props) {
    const [ searchParams, setSearchParams ] = useSearchParams();
    
    const page = parseInt(searchParams.get("page") || "1"); //현재 페이지번호 파라미터
    const [ totalPages, setTotalPages ] = useState(1); //총페이지 수 상태
    const [ category, setCategory ] = useState(searchParams.get("category") || "전체"); //카테고리 상태 및 파라미터
    const [ pageNumbers, setPageNumbers ] = useState([]); //페이지 번호 목록 상태

    const allMenuList = useAllMenuList(); //모든 메뉴 불러오기
    const { data: searchMenuList, isLoading: isMenuLoading } = allMenuList; //모든 메뉴 배열에 담기
    
    const updateIsExposureMutation = useUpdateIsPosureMutation(); //노출여부 뮤태이션

    const [ infoModalOpen, setInfoModalOpen ] = useState(false); //모달 열림 상태
    const [ infoModalDate, setInfoModalDate ] = useState(1); //모달에 전달할 메뉴데이터


    //카테고리에 맞는 메뉴 목록 불러오기
    const filteredMenuList = (searchMenuList?.data || []).filter(menu =>
        category === "전체" || menu.menuCategory === category
    );

    //필요한 목록 불러오기
    const renderMenuList = () => {

        //한 페이지에 담길 인덱스
        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;
        const churnkededMenuList = filteredMenuList.slice(startIndex, endIndex);

        //메뉴 출력
        return churnkededMenuList.map((menu) => (
            <li key={menu.menuId} onClick={() => handleInfoModalOnClick(menu.menuId)}>
                <div css={s.numBox}>{menu.menuId}</div>
                <div css={s.nameBox}>{menu.menuName}</div>
                <div css={s.priceBox}>{menu.menuPrice[0].menuPrice}</div>
                <div css={s.exBox}>
                    <input 
                        type='checkbox' 
                        checked={menu.isExposure === 1}
                        onChange={() => {
                            const newCheckedState = menu.isExposure === 1 ? 0 : 1;
                            handleChangeIsExposureOnClick(menu.menuId, newCheckedState);
                        }}
                    />
                </div>
            </li>
        ));
    };

        //메뉴 클릭 시 모달 작동
        const handleInfoModalOnClick = (menuId) => {
            setInfoModalDate(menuId); //모달에 데이터 전달
            setInfoModalOpen(true); //모달 열기
        }

    //노출여부 변경 및 목록 다시 불러오기
    const handleChangeIsExposureOnClick = async (menuId, isExposure) => {
        await updateIsExposureMutation.mutateAsync({ "menuId": menuId, "isExposure": isExposure });
        allMenuList.refetch();
    }

    //카테고리 설정
    const { data: getCategory } = useGetCategories();//카테고리 백에서 불러오기
    const selectCategories = [ //백에서 불러온거랑 합치기
        {label: "전체", value: "전체"},
        ...(getCategory?.data.map((categories) => ({
            label: categories,
            value: categories
        })) || [])
    ];
        
    //셀렉트에서 선택된 카테고리로 변경
    const handleSelectCategoryOnChange = (option) => {
        const choiceCategory = option.target.value;
        setCategory(choiceCategory); //상태 업데이트
        searchParams.set("category", option.target.value); //파라미터 값 변경
        searchParams.set("page", 1);
        setSearchParams(searchParams); //파라미터 업데이트
    }

    //클릭된 페이지 번호 상태에 적용
    const handlePageNumbersOnClick = (pageNumber) => {
        searchParams.set("page", pageNumber);
        setSearchParams(searchParams);
    }

    //페이지 메커니즘.
    useEffect(() => {
        if(!allMenuList?.isLoading && filteredMenuList.length > 0) {
            const totalPage = Math.ceil((filteredMenuList.length || 0) / 10); //총페이지 수
            setTotalPages(totalPage);
            const pageStartIndex = Math.floor((page - 1) / 5) * 5 + 1; //시작 페이지번호
            const pageEndIndex = pageStartIndex + 4 > totalPages ? totalPages : pageStartIndex + 4; //끝 페이지번호

            let newPageNumbers = []; //페이지 번호 목록
            for(let i = pageStartIndex; i <= pageEndIndex; i++ ) {
                newPageNumbers = [...newPageNumbers, i];
            }
            setPageNumbers(newPageNumbers);
        }
    }, [searchParams, category, totalPages, isMenuLoading]);


    //console.log(searchMenuList);
    
    return (
        <div css={s.container}>
            <div css={s.header}>
                <span>메뉴관리</span>
                <div>
                    <Select 
                        options={selectCategories}
                        style={{ //선택된값 스타일
                            width: '12rem',
                            minHeight: '4rem',
                            fontSize: '1.4rem',
                            fontWeight: '600',
                          }}
                        value={category}
                        onChange={handleSelectCategoryOnChange}
                    >
                        {selectCategories.map((categoryOption) => (
                        <MenuItem 
                            key={categoryOption.value} 
                            value={categoryOption.value}
                            style={{ //목록 스타일
                                width: '12rem',
                                minHeight: '3rem',
                                fontSize: '1.4rem', 
                              }}
                              >
                            {categoryOption.label}
                        </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>

            <div>
                <div css={s.title}>{category !== '전체' ? `${category} 리스트` : "전체 리스트"}</div>
                <ul css={s.menuListContainer}>
                    <li>
                        <div css={s.numBox}>NO.</div>
                        <div css={s.nameBox}>Name</div>
                        <div css={s.priceBox}>Price</div>
                        <div css={s.exBox}>On/Off</div>
                    </li>
                    { renderMenuList() }
                </ul>
                <ReactModal 
                    isOpen={infoModalOpen} 
                    onRequestClose={() => setInfoModalOpen(false)} //모달 밖을 누르면 닫힘
                    style={{
                        overlay: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#00000044"
                        },
                        content: {
                            position: "static",
                            boxSizing: "border-box",
                            borderRadius: "1.5rem",
                            height: "100rem",
                            width: "100rem",
                        }
                    }}
                >
                    <AdminMenuInfoModal setOpen={setInfoModalOpen} menuId={infoModalDate} />
                </ReactModal>
            </div>

            <div css={s.footer}>
                <button disabled={page === 1} onClick={() => handlePageNumbersOnClick(page - 1)}>
                    <GoChevronLeft/>
                </button>
                {
                    pageNumbers.map(number =>
                        <button key={number} css={s.pageNum(page === number)} onClick={() => handlePageNumbersOnClick(number)}>
                            <span>{number}</span>
                        </button>
                    )
                }
                <button disabled={page === totalPages} onClick={() => handlePageNumbersOnClick(page + 1)}>
                    <GoChevronRight />
                </button>
            </div>
        </div>
    );
}

export default AdminMenuPage;