/**@jsxImportSource @emotion/react */
import { Route, Routes, useNavigate } from 'react-router-dom';
import AdminSalesChart from '../../../components/AdminSales/AdminSalesChart/AdminSalesChart';
import { getSalesRequest } from '../../../apis/AdminApi/AdminSalesApi';
import * as s from './style';
import AdminSaleByMenu from '../../../components/AdminSales/AdminSaleByMenu/AdminSaleByMenu';
import MenuButton from '../../../components/MenuButton/MenuButton';
import { adminFetchMenuApi } from '../../../apis/menuApi';
import { useEffect, useState } from 'react';
import ToggleSwitch from '../../../components/ToggleSwitch/ToggleSwitch';
import { Select } from '@mui/material';
import { useRecoilState } from 'recoil';
import { salesModeState } from '../../../atoms/salesModeState/salesModeState';
import { useQuery } from '@tanstack/react-query';

function AdminSalesPage(props) {
    const [sales, setSales] = useState([]);
    const [menuList, setMenuList] = useState([]);
    const [salesMode, setSalesMode] = useRecoilState(salesModeState);
    const [yearOptions, setYearOptions] = useState([]);
    const [year, setYear] = useState({ value: "", label: "" });
    const [salesData, setSalesData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setSalesData(() => sales.filter((sales) => sales.year === year.value));
    }, [year]);

    useEffect(() => {
        let maxYear = -Infinity;  // 최대값을 저장할 변수를 음수 무한대로 초기화
    
        sales.forEach((item) => {
            if (item.year > maxYear) {
                maxYear = item.year;  // 현재 year 속성이 최대값보다 크면 최대값을 업데이트
            }
        });
    
        // maxYear가 여전히 -Infinity인 경우 기본값을 설정합니다.
        const validMaxYear = maxYear === -Infinity ? 2025 : maxYear; // 기본값 예: 2025년
        setYear({
            value: validMaxYear,
            label: validMaxYear,
        });

        // sales data에서 연도별 option을 추출하고 중복을 제거하여 설정합니다.
        const years = [...new Set(sales.map((item) => item.year))];
        setYearOptions(years);
    }, [sales]);

    const salesQuery = useQuery({
        queryKey: ["salesQuery"],  // queryKey는 배열이어도 됩니다.
        queryFn: getSalesRequest,  // 쿼리 함수
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (response) => {
            setSales(response.data);
            const years = [...new Set(response.data.map((data) => data.year))];
            setYearOptions(years);
        },
        onError: (error) => {
            console.log("salesQuery", error);
        },
    });

    // adminFetchMenuApi를 사용하여 전체 메뉴 목록을 가져오는 부분
        const menuQuery = useQuery({
            queryKey: ["menuQuery"],  // queryKey는 배열이어도 됩니다.
            queryFn: adminFetchMenuApi,  // 쿼리 함수
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                setMenuList(response.data);  // 성공적으로 데이터를 받으면 menuList에 저장
                console.log("Menu List:", response.data);  // 콘솔에 메뉴 목록 출력
            },
            onError: (error) => {
                console.log(error);
            },
        });

    const handleMenuClick = (id) => {
        navigate(`/admin/sale/menu?menuId=${id}`);
    };

    const handleYearOptionsOnChange = (selectedValue) => {
        const newYearValue = selectedValue?.value || "";
        // selectedValue가 yearOptions에 있는지 확인하고 없으면 빈 값으로 설정
        if (!yearOptions.includes(newYearValue)) {
            setYear({
                value: "", // 유효하지 않은 값인 경우 빈 문자열로 설정
                label: "",
            });
        } else {
            setYear({
                value: newYearValue,
                label: selectedValue?.label || "",
            });
        }
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
                        options={yearOptions.map((year) => ({
                            label: year,
                            value: year,
                        }))}
                        value={year?.value && yearOptions.includes(year.value) ? year.value : ""}  // 유효하지 않은 값이면 빈 문자열로 처리
                        onChange={handleYearOptionsOnChange}
                        placeholder="연도"
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                border: state.isFocused ? "none" : "none",
                                backgroundColor: "transparent",
                                fontSize: "20px",
                            }),
                        }}
                    />

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
                {menuList.map((menu, index) => (
                    <MenuButton
                        key={menu.menuId}
                        onClick={() => handleMenuClick(menu.menuId)}
                        menuName={menu.menuName}
                        price={menu.menuPrice}
                        img={menu.singleImg}
                    />
                ))}
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
