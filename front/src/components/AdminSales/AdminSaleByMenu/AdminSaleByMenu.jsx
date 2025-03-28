/**@jsxImportSource @emotion/react */
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as s from './style';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { getPaymentsRequest } from '../../../apis/AdminApi/AdminSalesApi';
import PageModal from '../../Modal/PageModal/PageModal';
import { MenuItem, Select } from '@mui/material';
import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch';
import AdminSalesChart from '../AdminSalesChart/AdminSalesChart';
import { salesModeState } from '../../../atoms/salesModeState/salesModeState';

function AdminSaleByMenu({ menuList }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [salesMode, setSalesMode] = useRecoilState(salesModeState);
    const [salesByMenu, setSalesByMenu] = useState([]);
    const [menuInfo, setMenuInfo] = useState();
    const [selectedMenu, setSelectedMenu] = useState(null); // 선택된 메뉴
    const [yearOptions, setYearOptions] = useState([]);
    const [year, setYear] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const menuIdFromParams = parseInt(searchParams.get("menuId"));
        
        if (isNaN(menuIdFromParams)) {
            console.log("Invalid menuId in searchParams");
            return;
        }

        const menu = menuList.find((menu) => menu.menuId === menuIdFromParams);
        if (menu) {
            setMenuInfo(menu);
            setSelectedMenu(menu); // 메뉴가 발견되면 해당 메뉴를 selectedMenu로 설정
            console.log(menu);
        } else {
            console.log("Menu not found");
            setMenuInfo(undefined);
            setSelectedMenu(null); // 메뉴가 없으면 selectedMenu 초기화
        }
    }, [menuList, searchParams]);

    useEffect(() => {
        let maxYear = -Infinity;

        if (Array.isArray(salesByMenu)) {
            salesByMenu.forEach((item) => {
                if (parseInt(item.orderYear) > maxYear) {
                    maxYear = parseInt(item.orderYear);
                }
            });
        }

        if (maxYear === -Infinity) {
            maxYear = "";
        }

        setYear(maxYear);
    }, [salesByMenu]);

    const portOneMutation = useMutation({
        mutationKey: ["portOneSales"],
        mutationFn: getPaymentsRequest,
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (response) => {
            const portOne = response.data.items;

            console.log(portOne);
            const filteredPortOne = portOne.filter(item => item.status !== 'CANCELLED' && item.status !== 'FAILED' && item.status !== 'READY');

            const years = filteredPortOne.map(item => {
                const paidAtDate = new Date(item.paidAt);
                return paidAtDate.getFullYear();
            });

            const months = filteredPortOne.map(item => {
                const paidAtDate = new Date(item.paidAt);
                return paidAtDate.getMonth() + 1;
            });

            const amount = filteredPortOne.map(item => {
                const total = item.amount.total;
                return isNaN(total) ? 0 : total;
            });


            const productDetails = filteredPortOne.map(item => {
                return item.products.map(product => ({
                    name: product.name,
                    quantity: product.quantity,
                    price: product.amount,
                    month: months
                }));
            }).flat();

            const groupedData = [];

            years.forEach((year, index) => {
                const month = months[index];
                const key = `${year}-${month}`;

                const existingGroup = groupedData.find(group => group.key === key);

                if (existingGroup) {
                    existingGroup.amount += amount[index];
                    existingGroup.productDetails.push(...productDetails.slice(index, index + 1));
                } else {
                    groupedData.push({
                        key,
                        year,
                        month,
                        amount: amount[index],
                        productDetails: productDetails.slice(index, index + 1)
                    });
                }
            });

            const salesData = groupedData.map(group => ({
                year: group.year,
                month: group.month,
                totalSales: group.amount,
                orderCount: group.productDetails.length,
                productDetails: group.productDetails
            }));

            const validSalesData = salesData.filter(data => !isNaN(data.totalSales) && !isNaN(data.orderCount));

            // 이제 포트원 데이터와 메뉴 리스트를 매칭하여 매출을 계산
            const salesByMenuWithNames = validSalesData.map(data => {
                const menuSales = data.productDetails.reduce((acc, product) => {
                    // 제품 이름을 쉼표로 분리하여 배열로 만듦
                    const productNames = product.name.split(',').map(name => name.trim());
                    
                    // productNames 배열을 평탄화하여 모든 메뉴 이름을 개별적으로 처리
                    productNames.forEach(productName => {
                        const matchingMenu = menuList.find(menu => menu.menuName === productName); // 메뉴 이름으로 매칭
                        console.log("판매된 메뉴", productName); // 하나씩 로그로 찍어보기
                        if (matchingMenu) {
                            const productMonth = data.month; // 판매된 월을 해당 `data`의 `month`로 설정
                            
                            // 메뉴 아이디가 없으면 초기화
                            if (!acc[matchingMenu.menuId]) {
                                acc[matchingMenu.menuId] = {
                                    menuName: matchingMenu.menuName,
                                    menuId: matchingMenu.menuId,
                                    month: productMonth, // 월 추가
                                    totalSales: 0,
                                    totalCount: 0
                                };
                            }
            
                            // 가격 정보가 있다면 곱하기
                            acc[matchingMenu.menuId].totalSales += product.quantity * product.price;
                            acc[matchingMenu.menuId].totalCount += product.quantity;
                        }
                    });
            
                    return acc;
                }, {});
            
                return Object.values(menuSales); // 그룹화된 데이터를 반환
            }).flat();
            
            setSalesByMenu(salesByMenuWithNames);

            const yearOptions = validSalesData.map(data => ({
                label: data.year,
                value: data.year
            }));
            setYearOptions(yearOptions);

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
        portOneMutation.mutate();
    }, []);

    const handleonClickCancel = () => {
        navigate("/admin/main/sale");
    };

    const handleYearOptionsOnChange = (e) => {
        const newValue = e.target.value;
        if (yearOptions.some(option => option.value === newValue)) {
            setYear(newValue);
        } else {
            setYear("");
        }
    };

    const filteredSalesByMenu = selectedMenu
        ? salesByMenu.filter(menuSale => menuSale.menuName === selectedMenu?.menuName) // menuName 기준으로 필터링
        : [];

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
                                value={year}
                                onChange={handleYearOptionsOnChange}
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
                                    sales={filteredSalesByMenu} // 필터링된 매출 데이터를 차트에 전달
                                    month={"month"}
                                    keyName={"총 매출"}
                                    dataKey={"totalSales"}
                                    barColor={"#8abdf3"}
                                    lineColor={"#ff7300"}
                                />
                            ) : (
                                <AdminSalesChart
                                    sales={filteredSalesByMenu} // 필터링된 매출 데이터를 차트에 전달
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
                        <img src={menuInfo?.singleImg || 'default-image-url'} alt="menuImg" />
                    </div>
                    <div css={s.infoBox}>
                        <div>{menuInfo?.menuName}</div>
                        <div>{menuInfo?.menuCategory}</div>
                        <div>{menuInfo?.menuPrice[0].menuPrice ? `${menuInfo?.menuPrice[0].menuPrice}원` : '가격 정보 없음'}</div>
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
