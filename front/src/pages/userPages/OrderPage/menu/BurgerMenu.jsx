import React, { useEffect } from 'react';
import useMenuData from '../../../../hooks/menu/getMenuHooks';

function BurgerMenu({ onMenuItemClick }) {
    // useMenuData 훅을 사용하여 메뉴 데이터를 가져옴
    const { data: menuData, error, isLoading } = useMenuData();

    useEffect(() => {
        if (menuData) {
            console.log("Fetched Menu Data:", menuData);
            console.log("Fetched Menu Data.Data:", menuData.data);
        }
    }, [menuData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.log("Fetched Menu Data:", menuData);
        console.log("Fetched Menu Data:", menuData.data);
        console.error("메뉴 데이터를 가져오는 데 실패했습니다:", error);
        return <div>메뉴 데이터를 가져오는 데 실패했습니다.</div>;
    }

    return (
        <div>
            {(menuData || [])
                .filter((burger) => burger.menuCategory === "버거") // "버거"인 것만 필터링
                .map((burger) => (
                    <div 
                        key={burger.menuId} 
                        onClick={() => onMenuItemClick({ // 선택한 메뉴의 name, img, img2, price 등을 전달
                            name: burger.menuName, 
                            category: burger.menuCategory,
                            seq: burger.menuSequence,
                            img: burger.singleImg, 
                            img2: burger.setImg,
                            size: burger.size,
                            price: burger.menuPrice.menuPrice || 0,

                        })}
                        style={{ cursor: 'pointer' }} // 클릭 가능하도록 스타일 추가
                    >
                        <img src={burger.singleImg} alt={burger.menuName} />
                        <p>{burger.menuName}</p>
                        <p>{burger.menuPrice.menuPrice ? `${burger.menuPrice.menuPrice}원` : "가격 없음"}</p>
                    </div>
                ))}
        </div>
    );
}

export default BurgerMenu;