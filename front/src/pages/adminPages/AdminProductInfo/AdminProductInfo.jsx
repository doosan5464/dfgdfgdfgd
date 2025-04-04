/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import useMenuData from "../../../hooks/menu/getMenuHooks";
import { useMenuInfoList } from "../../../hooks/menu/getMenuInfoHook";
import AdminHeader from "../../../components/common/AdminHeader/AdminHeader";
import { useUpdateMenuInfo } from "../../../mutations/menuIfoMutation";
import { useSearchParams } from "react-router-dom";

function AdminProductInfo() {
    //메뉴관리페이지에서 넘어오는 정보 받기 - 삭제 ㄴㄴ
    const [ searchParams, setSearchParams ] = useSearchParams();
    //메뉴관리페이지에서 넘어오는거 없으면 null로 기존꺼 유지됨 - 삭제 ㄴㄴ
    const [ selectedMenuId, setSelectedMenuId ] = useState(!!searchParams.get("menuId") ? parseInt(searchParams.get("menuId")) : null);

    const { data: menus = [] } = useMenuData();
    // const [selectedMenuId, setSelectedMenuId] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const { data: menuInfoList = [] } = useMenuInfoList(selectedMenuId);
    const [editMode, setEditMode] = useState(false);
    const [menuOrigin, setMenuOrigin] = useState("");
    const [editInfo, setEditInfo] = useState([]);
    const { mutate: updateMutate } = useUpdateMenuInfo();

    useEffect(() => {
        if (menus.length > 0 && selectedMenuId === null) {
            setSelectedMenuId(menus[0].menuId);
        }
    }, [menus, selectedMenuId]);

    useEffect(() => {
        if (selectedMenuId) {
            const found = menus.find((m) => m.menuId === selectedMenuId);
            setSelectedMenu(found || null);
        }
    }, [selectedMenuId, menus]);

    useEffect(() => {
        if (menuInfoList.length > 0) {
            setMenuOrigin(menuInfoList[0].menuOrigin || "");
            setEditInfo(menuInfoList.map((info) => ({ ...info })));
        } else {
            setMenuOrigin("");
            setEditInfo([]);
        }
    }, [menuInfoList]);

    // 일일 영양소 권장량 기준(g)
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

    const handleCellUpdateOnBlur = (index, field, value) => {
        const updated = [...editInfo];
        updated[index][field] = value;
        setEditInfo(updated);
    };

    const handleUpdateMenuOnClick = () => {
        if (editMode) {
            editInfo.forEach((info) => {
                const requestBody = {
                    menuInfoId: info.menuInfoId,
                    weight: parseInt(info.weight) || 0,
                    volume: parseInt(info.volume) || 0,
                    calories: parseInt(info.calories) || 0,
                    sugars: parseInt(info.sugars) || 0,
                    protein: parseInt(info.protein) || 0,
                    saturatedFat: parseInt(info.saturatedFat) || 0,
                    sodium: parseInt(info.sodium) || 0,
                    caffeine: parseInt(info.caffeine) || 0,
                    menuOrigin: menuOrigin,
                };
                updateMutate(requestBody);
            });
            alert("수정 완료!");
        }
        setEditMode(!editMode);
    };

    return (
        <>
            <AdminHeader title={"영양정보 및 원산지 관리"} />
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
                    <div css={s.inputGroup}>
                        <label css={s.label}>메뉴 이름</label>
                        <select
                            css={s.dropdown}
                            value={selectedMenuId || ""}
                            onChange={(e) => setSelectedMenuId(Number(e.target.value))}
                            disabled={editMode}
                        >
                            {menus.map((menu) => (
                                <option key={menu.menuId} value={menu.menuId}>
                                    {menu.menuName}
                                </option>
                            ))}
                        </select>
                        <label css={s.label}>원산지</label>
                        <textarea
                            css={s.textarea}
                            value={menuOrigin}
                            onChange={(e) => setMenuOrigin(e.target.value)}
                            disabled={!editMode}
                        />
                    </div>

                    <div css={s.buttonGroup}>
                        <button css={s.button} onClick={handleUpdateMenuOnClick}>
                            {editMode ? "확인" : "수정"}
                        </button>
                    </div>
                </div>
                <div css={s.rightPanel}>
                    {editInfo.length > 0 &&
                        editInfo
                            .filter((info) => {
                                // 조건: set_img가 없으면 M사이즈만, set_img 있으면 둘 다
                                if (!selectedMenu?.setImg) {
                                    return info.size === "M";
                                }
                                return true;
                            })
                            .map((info, index) => (
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
                                            {["weight", "volume", "calories", "sugars", "protein", "saturatedFat", "sodium", "caffeine"].map((field, i) => (
                                                <td
                                                    key={i}
                                                    css={s.td}
                                                    contentEditable={editMode}
                                                    suppressContentEditableWarning={true}
                                                    onBlur={(e) =>
                                                        handleCellUpdateOnBlur(
                                                            index,
                                                            field,
                                                            e.target.innerText === "-" ? "" : e.target.innerText
                                                        )
                                                    }
                                                >
                                                    {info[field] !== 0 && info[field] !== null
                                                        ? info[field]
                                                        : editMode
                                                        ? ""
                                                        : "-"}
                                                </td>
                                            ))}
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
                                                {calculatePercentage(info.saturatedFat, NUTRITION_STANDARD.saturatedFat)}
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
        </>
    );
}

export default AdminProductInfo;
