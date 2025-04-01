/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import useMenuData from "../../../hooks/menu/getMenuHooks";
import { useMenuInfo } from "../../../hooks/menu/getMenuInfoHook";

function AdminProductInfo() {
    const { data: menus = [] } = useMenuData();
    const [selectedMenuId, setSelectedMenuId] = useState(null);
    const { data: menuInfo } = useMenuInfo(selectedMenuId);

    useEffect(() => {
        if (menus.length > 0 && !selectedMenuId) {
            setSelectedMenuId(menus[0].menuId);
        }
    }, [menus]);

    

    const handleSubmitMenuOnClick = async () => {
        
    };

    const handleUpdateMenuOnClick = async () => {
        
    };

    return (
        <div css={s.container}>
            <div css={s.dropdownContainer}>
                <select
                    css={s.dropdown}
                    value={selectedMenuId || ""}
                    onChange={(e) => setSelectedMenuId(Number(e.target.value))}
                >
                    {menus.map((menu) => (
                        <option key={menu.menuId} value={menu.menuId}>
                            {menu.menuName}
                        </option>
                    ))}
                </select>
            </div>
            <div css={s.productContainer}>
                <div css={s.imageCon}>
                    <label css={s.imageBox}>
                        <img src="#" alt="Single_img" />
                        <span>메뉴</span>
                    </label>
                </div>

                {/* 입력 */}
                <div css={s.inputGroup}>
                    <div>
                        <label css={s.label}>상품명</label>
                        <input
                            type="text"
                            css={s.input}
                        />
                    </div>
                    <div>
                        <label css={s.label}>원산지</label>
                        <input
                            type="text"
                            css={s.input}
                        />
                    </div>
                    
                </div>
            </div>
            {/* 영양정보 테이블 */}
            <div>
            {menuInfo && (
                <table css={s.table}>
                    <caption css={s.caption}>영양정보</caption>
                    <thead>
                        <tr>
                            <th css={s.th}>영양소</th>
                            <th css={s.th}>중량(g)</th>
                            <th css={s.th}>용량(ml)</th>
                            <th css={s.th}>열량(kcal)</th>
                            <th css={s.th}>당(g)</th>
                            <th css={s.th}>단백질(g)</th>
                            <th css={s.th}>포화지방(g)</th>
                            <th css={s.th}>나트륨(mg)</th>
                            <th css={s.th}>카페인(mg)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td css={s.td}>함량</td>
                            <td css={s.td}>{menuInfo.weight || "-"}</td>
                            <td css={s.td}>{menuInfo.volume || "-"}</td>
                            <td css={s.td}>{menuInfo.calories || "-"}</td>
                            <td css={s.td}>{menuInfo.sugars || "-"}</td>
                            <td css={s.td}>{menuInfo.protein || "-"}</td>
                            <td css={s.td}>{menuInfo.saturatedFat || "-"}</td>
                            <td css={s.td}>{menuInfo.sodium || "-"}</td>
                            <td css={s.td}>{menuInfo.caffeine || "-"}</td>
                        </tr>
                        <tr css={s.evenRow}>
                            <td css={s.td}>영양소 기준치</td>
                            <td css={s.td}>-</td>
                            <td css={s.td}>-</td>
                            <td css={s.td}>-</td>
                            <td css={s.td}>
                                {calculatePercentage(menuInfo.sugar, NUTRITION_STANDARD.sugar)}
                            </td>
                            <td css={s.td}>
                                {calculatePercentage(menuInfo.protein, NUTRITION_STANDARD.protein)}
                            </td>
                            <td css={s.td}>
                                {calculatePercentage(menuInfo.saturatedFat, NUTRITION_STANDARD.saturatedFat)}
                            </td>
                            <td css={s.td}>
                                {calculatePercentage(menuInfo.sodium, NUTRITION_STANDARD.sodium)}
                            </td>
                            <td css={s.td}>-</td>
                        </tr>
                    </tbody>
                </table>
            )}
            </div>
            <div css={s.buttonGroup}>
                <button css={s.button}> 추가
                </button>

                <button css={s.button}> 수정
                </button>
            </div>
        </div>
    );
}

export default AdminProductInfo;
