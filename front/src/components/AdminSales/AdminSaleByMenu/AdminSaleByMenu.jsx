/**@jsxImportSource @emotion/react */
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as s from './style';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getPaymentsRequest, getSalesRequest, searchSalesByMenuRequest } from '../../../apis/AdminApi/AdminSalesApi';
import PageModal from '../../Modal/PageModal/PageModal';
import { MenuItem, Select } from '@mui/material';
import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch';
import AdminSalesChart from '../AdminSalesChart/AdminSalesChart';
import { salesModeState } from '../../../atoms/salesModeState/salesModeState';

function AdminSaleByMenu({menuList}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [salesMode, setSalesMode] = useRecoilState(salesModeState);
    const [salesByMenu, setSalesByMenu] = useState([]);
    const [menuInfo, setMenuInfo] = useState();
    const [selectedMenu, setSelectedMenu] = useState();
    const [yearOptions, setYearOptions] = useState([]);
    const [year, setYear] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const menuIdFromParams = parseInt(searchParams.get("menuId"));
        
        // 메뉴 ID가 유효한지 확인
        if (isNaN(menuIdFromParams)) {
            console.log("Invalid menuId in searchParams");
            return;
        }
    
        const menu = menuList.find((menu) => menu.menuId === menuIdFromParams);
        // 메뉴가 존재하지 않으면 menuInfo를 undefined로 설정
        if (menu) {
            setMenuInfo(menu);
            console.log(menu)
        } else {
            console.log("Menu not found");
            setMenuInfo(undefined); // 메뉴를 찾을 수 없으면 undefined로 설정
        }
    }, [menuList, searchParams]);

    useEffect(() => {
        let maxYear = -Infinity; // 최대값을 저장할 변수를 음수 무한대로 초기화
    
        if (Array.isArray(salesByMenu)) {
            salesByMenu.forEach((item) => {
                if (parseInt(item.orderYear) > maxYear) {
                    maxYear = parseInt(item.orderYear); // 현재 year 속성이 최대값보다 크면 최대값을 업데이트
                }
            });
        }
    
        // maxYear가 -Infinity인 경우, year를 유효한 값으로 설정
        if (maxYear === -Infinity) {
            maxYear = ""; // 또는 null, 적절한 기본값을 설정
        }
    
        // 단순히 숫자나 문자열을 setYear로 설정
        setYear(maxYear);
    }, [salesByMenu]);
    

    const portOneMutation = useMutation({
            mutationKey: ["portOneSales"],
            mutationFn: getPaymentsRequest,
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                const portOne = response.data.items; // 또는 response.items
        
                console.log(portOne)
                // 'CANCELLED'와 'FAILED' 상태인 항목을 제외
                const filteredPortOne = portOne.filter(item => item.status !== 'CANCELLED' && item.status !== 'FAILED' && item.status !== 'READY');
        
                // 각 아이템에서 paidAt 값을 추출하여 연도만 가져오기
                const years = filteredPortOne.map(item => {
                    const paidAtDate = new Date(item.paidAt);
                    return paidAtDate.getFullYear(); // 연도 추출
                });
        
                const months = filteredPortOne.map(item => {
                    const paidAtDate = new Date(item.paidAt);
                    return paidAtDate.getMonth() + 1; // 월 추출
                });
        
                // NaN이 발생할 수 있는 부분에서 기본 값 설정
                const amount = filteredPortOne.map(item => {
                    const total = item.amount.total;
                    return isNaN(total) ? 0 : total; // NaN이면 0으로 설정
                });
        
                const productDetails = filteredPortOne.map(item => {
                    return item.products.map(product => ({
                        name: product.name,   // 제품명
                        quantity: product.quantity // 제품 수량
                    }));
                }).flat(); // 중첩된 배열을 평평하게 만듭니다.
        
                // 데이터를 { year, month } 기준으로 그룹화
                const groupedData = [];
        
                years.forEach((year, index) => {
                    const month = months[index];
                    const key = `${year}-${month}`; // "연도-월"로 그룹화 키 생성
        
                    // 그룹이 이미 존재하면 해당 그룹의 값들을 합산, 없으면 새로운 그룹을 생성
                    const existingGroup = groupedData.find(group => group.key === key);
        
                    if (existingGroup) {
                        // 기존 그룹에 데이터 추가
                        existingGroup.amount += amount[index];
                        existingGroup.productDetails.push(...productDetails.slice(index, index + 1));
                    } else {
                        // 새로운 그룹 생성
                        groupedData.push({
                            key,
                            year,
                            month,
                            amount: amount[index],
                            productDetails: productDetails.slice(index, index + 1)
                        });
                    }
                });
        
                // 최종 결과 객체
                const result = {
                    groupedData
                };
        
                // 이제 그룹화된 데이터로 salesData를 설정
                const salesData = groupedData.map(group => ({
                    year: group.year,
                    month: group.month,
                    totalSales: group.amount, // 총 매출
                    orderCount: group.productDetails.length, // 주문 수 (제품의 개수로 가정)
                    productDetails: group.productDetails
                }));
        
                // NaN 값 필터링
                const validSalesData = salesData.filter(data => !isNaN(data.totalSales) && !isNaN(data.orderCount));
        
                setSalesByMenu(validSalesData);
        
                // 고유 연도 목록 추출하여 yearOptions에 설정
                const yearOptions = validSalesData.map(data => ({
                    label: data.year, 
                    value: data.year
                }));
                setYearOptions(yearOptions);
        
                // 첫 번째 연도를 기본값으로 설정
                if (yearOptions.length > 0) {
                    const selectedYear = yearOptions[0].value;
                    setYear(selectedYear);
                }
            },
            onError: (error) => {
                console.log("salesQuery", error);
            },
        });

    useEffect(() => {
        if (Array.isArray(salesByMenu)) {
            setSelectedMenu(() =>
                salesByMenu
                    .filter((menu) => {
                        return (
                            menu?.menuId === parseInt(searchParams.get("menuId")) &&
                            parseInt(menu.orderYear) === year?.value
                        );
                    })
                    .map((menu) => {
                        return {
                            menuId: menu.menuId,
                            month: parseInt(menu.orderMonth),
                            year: parseInt(menu.orderYear),
                            totalSales: menu.sales,
                            totalCount: menu.totalCount,
                        };
                    })
            );
        }
    }, [salesByMenu, year]);
    

    const handleonClickCancel = () => {
        navigate("/admin/main/sale");
    };

    useEffect(() => {
        portOneMutation.mutate();
    }, []);

    // year.value가 yearOptions에 포함되지 않으면 빈 문자열로 설정
    const handleYearOptionsOnChange = (e) => {
        const newValue = e.target.value;
        // yearOptions에 포함되는 값만 허용
        if (yearOptions.some(option => option.value === newValue)) {
            setYear(newValue); // 연도 값 설정
        } else {
            setYear(""); // 유효하지 않은 값은 빈 문자열로 설정
        }
    };

    return (
        <PageModal>
            <div css={s.layout}>
                <div css={s.header}>
                    <div css={s.title}>메뉴 매출 조회</div>
                </div>
                <div css={s.main}>
                    <div css={s.chartLayout}>
                        <div css={s.toggleSwitchLayout}>
                            <div css={s.toggleSwitch}>
                                <div>총 매출</div>
                                <ToggleSwitch
                                    width={50}
                                    height={25}
                                    onColor={"#ff7300"}
                                    offColor={"#8abdf3"}
                                    state={"sales"}
                                    checked={salesMode}
                                />
                                <div>총 주문 수</div>
                            </div>
                            <Select
                                value={year} // year를 숫자나 문자열로 설정
                                onChange={handleYearOptionsOnChange} // 연도 변경 처리
                                label="연도"
                            >
                                <MenuItem value="">
                                    <em>연도 선택</em>
                                </MenuItem>
                                {yearOptions.map((yearOption) => (
                                    <MenuItem key={yearOption.value} value={yearOption.value}>
                                        {yearOption.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div css={s.chartBox}>
                            {!salesMode ? (
                                <AdminSalesChart
                                    sales={selectedMenu}
                                    month={"month"}
                                    keyName={"총 매출"}
                                    dataKey={"totalSales"}
                                    barColor={"#8abdf3"}
                                    lineColor={"#ff7300"}
                                />
                            ) : (
                                <AdminSalesChart
                                    sales={selectedMenu}
                                    month={"month"}
                                    keyName={"총 주문 수"}
                                    dataKey={"totalCount"}
                                    barColor={"#ff7300"}
                                    lineColor={"#8abdf3"}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div css={s.menuInfo}>
                    <div css={s.imgBox}>
                        {/* menuImgUrl이 없을 수도 있으므로, 안전하게 체크하고 렌더링 */}
                        <img src={menuInfo?.singleImg || 'default-image-url'} alt="menuImg" />
                    </div>
                    <div css={s.infoBox}>
                        {/* menuInfo가 존재하고 그 속성들에 접근 */}
                        <div>{menuInfo?.menuName}</div>
                        <div>{menuInfo?.menuCategory}</div>
                        <div>{menuInfo?.menuPrice[0].menuPrice ? `${menuInfo?.menuPrice[0].menuPrice}원` : '가격 정보 없음'}</div>
                        {/* 다른 속성들 */}
                        <div>Menu ID: {menuInfo?.menuId}</div>
                        <div>Discount Price: {menuInfo?.menuPrice[0].discountPrice ? `${menuInfo.menuPrice[0].discountPrice}원` : '할인 가격 정보 없음'}</div>
                    </div>
                </div>
                <div css={s.buttonLayout}>
                    <button css={s.cancel} onClick={handleonClickCancel}>
                        닫기
                    </button>
                </div>
            </div>
        </PageModal>
    );
}

export default AdminSaleByMenu;