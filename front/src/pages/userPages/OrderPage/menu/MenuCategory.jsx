/**@jsxImportSource @emotion/react */
import React from 'react';
import menuForUser from '../../../../hooks/menu/menuForUser';

function MenuCategory({ selectedCategory, onMenuItemClick }) {
    const { data: menuData, error, isLoading } = menuForUser();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error("메뉴 데이터를 가져오는 데 실패했습니다:", error);
        return <div>메뉴 데이터를 가져오는 데 실패했습니다.</div>;
    }

    return (
        <div>
            {(menuData || [])
                .filter((menu) => menu.menuCategory === selectedCategory)
                .map((menu) => (
                    <div 
                        key={menu.menuId} 
                        onClick={() => onMenuItemClick({
                            name: menu.menuName, 
                            category: menu.menuCategory,
                            seq: menu.menuSequence,
                            img: menu.singleImg, 
                            img2: menu.setImg,
                            size: menu.size,
                            price1: menu.menuPrice[0]?.menuPrice || 0,
                            price2: menu.menuPrice.length > 1 ? menu.menuPrice[1].menuPrice : 0,
                        })}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={menu.singleImg} alt={menu.menuName} />
                        <p>{menu.menuName}</p>
                        <p>{menu.menuPrice?.[0]?.menuPrice ? `${menu.menuPrice[0].menuPrice}원` : "가격 없음"}</p>
                    </div>
                ))}
        </div>
    );
}

export default MenuCategory;
