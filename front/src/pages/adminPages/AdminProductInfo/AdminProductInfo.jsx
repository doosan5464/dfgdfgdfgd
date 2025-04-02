/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import useMenuData from "../../../hooks/menu/getMenuHooks";
import { useMenuInfoList } from "../../../hooks/menu/getMenuInfoHook";

function AdminProductInfo() {
    const { data: menus = [] } = useMenuData();
    const [selectedMenuId, setSelectedMenuId] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const { data: menuInfoList = [] } = useMenuInfoList(selectedMenuId);

    useEffect(() => {
        if (menus.length > 0) {
            setSelectedMenuId(menus[0].menuId);
        }
    }, [menus]);

    useEffect(() => {
        if (selectedMenuId) {
            const found = menus.find((m) => m.menuId === selectedMenuId);
            setSelectedMenu(found || null);
        }
    }, [selectedMenuId, menus]);

    const NUTRITION_STANDARD = {
        sugars: 100,
        protein: 55,
        saturatedFat: 15,
        sodium: 2000,
    };

    const calculatePercentage = (value, standard) => {
        if (!value || !standard) return "-";
        return `${Math.round((value / standard) * 100)}%`;
    };

    const handleUpdate = () => {
        alert("수정 기능 준비 중!");
    };

    const handleDelete = () => {
        alert("삭제 기능 준비 중!");
    };

    return (
        <div css={s.container}>
            {/* 왼쪽 패널 */}
            <div css={s.leftPanel}>

                <div css={s.imageBox}>
                    {selectedMenu?.singleImg ? (
                        <img src={selectedMenu.singleImg} alt={selectedMenu.menuName} />
                    ) : (
                        "이미지 영역"
                    )}
                </div>
                
                {/* 드롭다운 */}
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

                <div css={s.inputGroup}>
                    <div>
                        <label css={s.label}>메뉴 이름</label>
                        <input
                            css={s.input}
                            value={selectedMenu?.menuName || ""}
                            readOnly
                        />
                    </div>
                    <div>
                        <label css={s.label}>원산지</label>
                        <input
                            css={s.input}
                            value={menuInfoList[0]?.menuOrigin || ""}
                            readOnly
                        />
                    </div>
                </div>

                <div css={s.buttonGroup}>
                    <button css={s.button} onClick={handleUpdate}>
                        수정
                    </button>
                    <button css={s.button} onClick={handleDelete}>
                        삭제
                    </button>
                </div>
            </div>

            {/* 오른쪽 패널 */}
            <div css={s.rightPanel}>
                {menuInfoList.length > 0 &&
                    menuInfoList.map((info, index) => (
                        <table css={s.table} key={index}>
                            <caption css={s.caption}>{info.size} 사이즈 영양정보</caption>
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
                                    <td css={s.td}>{info.weight || "-"}</td>
                                    <td css={s.td}>{info.volume || "-"}</td>
                                    <td css={s.td}>{info.calories || "-"}</td>
                                    <td css={s.td}>{info.sugars || "-"}</td>
                                    <td css={s.td}>{info.protein || "-"}</td>
                                    <td css={s.td}>{info.saturatedFat || "-"}</td>
                                    <td css={s.td}>{info.sodium || "-"}</td>
                                    <td css={s.td}>{info.caffeine || "-"}</td>
                                </tr>
                                <tr css={s.evenRow}>
                                    <td css={s.td}>영양소 기준치</td>
                                    <td css={s.td}>-</td>
                                    <td css={s.td}>-</td>
                                    <td css={s.td}>-</td>
                                    <td css={s.td}>
                                        {calculatePercentage(info.sugars, NUTRITION_STANDARD.sugars)}
                                    </td>
                                    <td css={s.td}>
                                        {calculatePercentage(info.protein, NUTRITION_STANDARD.protein)}
                                    </td>
                                    <td css={s.td}>
                                        {calculatePercentage(
                                            info.saturatedFat,
                                            NUTRITION_STANDARD.saturatedFat
                                        )}
                                    </td>
                                    <td css={s.td}>
                                        {calculatePercentage(info.sodium, NUTRITION_STANDARD.sodium)}
                                    </td>
                                    <td css={s.td}>-</td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
            </div>
        </div>
    );
}

export default AdminProductInfo;
