/**@jsxImportSource @emotion/react */
import { Route, Routes, useNavigate } from 'react-router-dom';
import AdminSalesChart from '../../../components/AdminSales/AdminSalesChart/AdminSalesChart';
import { getPaymentsRequest, getSalesRequest } from '../../../apis/AdminApi/AdminSalesApi';
import * as s from './style';
import AdminSaleByMenu from '../../../components/AdminSales/AdminSaleByMenu/AdminSaleByMenu';
import MenuButton from '../../../components/MenuButton/MenuButton';
import { adminFetchMenuApi } from '../../../apis/menuApi';
import { useEffect, useState } from 'react';
import ToggleSwitch from '../../../components/ToggleSwitch/ToggleSwitch';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { useRecoilState } from 'recoil';
import { salesModeState } from '../../../atoms/salesModeState/salesModeState';
import { useMutation } from '@tanstack/react-query';

function AdminSalesPage(props) {
    const [sales, setSales] = useState([]); // 매출 데이터
    const [menuList, setMenuList] = useState([]); // 메뉴 목록
    const [salesMode, setSalesMode] = useRecoilState(salesModeState); // 매출/주문 모드 상태
    const [yearOptions, setYearOptions] = useState([]); // 연도 옵션
    const [year, setYear] = useState(""); // 선택된 연도
    const [salesData, setSalesData] = useState([]); // 필터링된 매출 데이터
    const navigate = useNavigate();

    // sales와 year가 변경될 때마다 salesData 업데이트
    useEffect(() => {
        const filteredSales = sales.filter((sale) => sale.year === year);
        setSalesData(filteredSales);
    }, [sales, year]);

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
    
            setSales(validSalesData);
    
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
    

    
    // 매출 데이터를 API에서 받아오고 연도 옵션 설정
    const salesMutation = useMutation({
        mutationKey: ["getSales"],
        mutationFn: getSalesRequest,
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (response) => {
            // 응답이 배열인 경우 year 값 추출
            if (Array.isArray(response) && response.length > 0) {
                const salesData = response; // 매출 데이터
                setSales(salesData);
    
                // 고유 연도 목록 추출하여 yearOptions에 설정
                const years = salesData.map((data) => ({label: data.year, value: data.year}));
                setYearOptions(years);
    
                // 첫 번째 연도를 기본값으로 설정
                if (years.length > 0) {
                    // year.value가 설정된 값이 yearOptions에 포함되지 않으면 빈 값으로 초기화
                    const selectedYear = years[0].value;
                    setYear(selectedYear);
                }
            }
        },
        onError: (error) => {
            console.log("salesQuery", error);
        },
    });

    useEffect(() => {
        console.log("Updated yearOptions: ", yearOptions);
    }, [yearOptions]);

    // 메뉴 조회 API 요청
    const menuMutation = useMutation({
        mutationKey: ["getAllMenuMutation"],
        mutationFn: adminFetchMenuApi,
        retry: 0,
        onSuccess: (response) => {
            setMenuList(response);
        },
        onError: (error) => {
            console.log("Menu Fetch Error", error);
        },
    });

    useEffect(() => {
        menuMutation.mutate();
        portOneMutation.mutate();
    }, []);

    const handleMenuClick = (id) => {
        navigate(`/admin/main/sale/menu?menuId=${id}`);
    };

    // year.value가 yearOptions에 포함되지 않으면 빈 문자열로 설정
    const handleYearOptionsOnChange = (e) => {
        // yearOptions에 포함되는 값만 허용, 아니면 빈 문자열로 설정
        setYear(e.target.value);
    };

    return (
        <div css={s.layout}>
            <div css={s.header}>
                <div css={s.title}>매출 조회</div>
            </div>
            <div css={s.salesCharts}>
                <div css={s.toggleSwitch}>
                    <div>
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
                        value={year} // 상태 값 전달
                        onChange={handleYearOptionsOnChange} // 연도 변경 처리
                        label="연도"
                    >
                        {/* placeholder처럼 사용할 MenuItem */}
                        <MenuItem value="">
                            <em>연도 선택</em>
                        </MenuItem>
                        {
                            yearOptions.map((yearOption) => (
                                <MenuItem key={yearOption.value} value={yearOption.value}>
                                    {yearOption.label}
                                </MenuItem>
                            ))
                        }
                    </Select>

                </div>
                <div css={s.chartBox}>
                    {!salesMode ? (
                        <AdminSalesChart
                            sales={salesData}
                            month={"month"}
                            keyName={"총 매출"}
                            dataKey={"totalSales"}
                            barColor={"#8abdf3"}
                            lineColor={"#ff7300"}
                        />
                    ) : (
                        <AdminSalesChart
                            sales={salesData}
                            month={"month"}
                            keyName={"총 주문 수"}
                            dataKey={"orderCount"}
                            barColor={"#ff7300"}
                            lineColor={"#8abdf3"}
                        />
                    )}
                </div>
            </div>
            <div css={s.line}></div>
            <div css={s.menuList}>
                {(Array.isArray(menuList) && menuList.length > 0) ? (
                    menuList.map((menu) => (
                        <MenuButton
                            key={menu.menuId}
                            onClick={() => handleMenuClick(menu.menuId)}
                            menuName={menu.menuName}
                            price={menu.menuPrice}
                            img={menu.singleImg}
                        />
                    ))
                ) : (
                    <div>메뉴 정보가 없습니다.</div>
                )}
            </div>

            <Routes>
                <Route path="/" element={<></>} />
                <Route
                    path="/menu/*"
                    element={<AdminSaleByMenu menuList={menuList} />}
                />
            </Routes>
        </div>
    );
}

export default AdminSalesPage;
