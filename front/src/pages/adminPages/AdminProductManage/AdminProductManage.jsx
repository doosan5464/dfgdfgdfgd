/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { Checkbox } from "@mui/material";
import {
    useAddMenuMutation,
    useDeleteMenuMutation,
    useUpdateMenuMutation,
} from "../../../mutations/menuMutation";
import useMenuData, { useMenuDetail } from "../../../hooks/menu/getMenuHooks";
import ImageModal from "../AdminMenuImagine/AdminMenuImagine";

const INITIAL_FORM_DATA = {
    menuName: "",
    menuCategory: "",
    menuSequence: "",
    isExposure: 1,
    singleImg: null,
    setImg: null,
    prices: [
        { size: "M", price: "", discountPrice: "" },
        { size: "L", price: "", discountPrice: "" },
    ],
};

function AdminProductManage() {
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImageType, setSelectedImageType] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    const { data: menus = [], isLoading } = useMenuData();
    const { data: menuDetail } = useMenuDetail(selectedMenu);
    const addMenuMutation = useAddMenuMutation();
    const deleteMenuMutation = useDeleteMenuMutation();
    const updateMenuMutation = useUpdateMenuMutation();

    useEffect(() => {
        if (menus.length > 0 && !isAdding) {
            setSelectedMenu((prev) => prev ?? menus[0].menuId);
        }
    }, [menus, isAdding]);

    useEffect(() => {
        if (!menuDetail || isAdding) return;
    
        const defaultPrices = [
            { size: "M", price: "", discountPrice: "" },
            { size: "L", price: "", discountPrice: "" },
        ];
    
        const prices = Array.isArray(menuDetail.menuPrice)
            ? defaultPrices.map((d) => {
                const found = menuDetail.menuPrice.find((p) => p.size === d.size);
                return found
                    ? {
                        size: found.size,
                        price: found.menuPrice || "",
                        discountPrice: found.discountPrice || "",
                    }
                : d;
            })
            : defaultPrices;
    
        setFormData({
            menuCategory: menuDetail.menuCategory || "",
            menuName: menuDetail.menuName || "",
            menuSequence: menuDetail.menuSequence || 0,
            isExposure: menuDetail.isExposure ?? 1,
            singleImg: menuDetail.singleImg || null,
            setImg: menuDetail.setImg || null,
            prices,
        });
    }, [menuDetail, isAdding]);

    const handleOpenModalOnClick = (type) => {
        const convertedType = type === "single" ? "singleImg" : "setImg";
        setSelectedImageType(convertedType);
        setModalOpen(true);
    };

    const handleSelectImageOnSelect = (imgUrl, imgName) => {
        setFormData((prev) => {
            if (selectedImageType === "singleImg" && !prev.menuName) {
                return {
                    ...prev,
                    singleImg: imgUrl,
                    menuName: imgName, // 단품은 이름 자동 입력
                };
            } else if (selectedImageType === "setImg") {
                return {
                    ...prev,
                    setImg: imgUrl, // 세트는 이름 입력 안 함
                };
            }
            return prev;
        });
        setModalOpen(false);
    };

    const handleInputValueOnChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                [name]: checked ? 1 : 0,
            }));
            return;
        }

        if (name === "M" || name === "L") {
            setFormData((prev) => {
                const updatedPrices = prev.prices.map((p) =>
                    p.size === name ? { ...p, price: value } : p
                );
                return { ...prev, prices: updatedPrices };
            });
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmitMenuOnClick = async () => {
        if (!isAdding) {
            setIsAdding(true);
            setIsEditing(true);
            setFormData(INITIAL_FORM_DATA);
            setSelectedMenu(null);
            return;
        }

        try {
            await addMenuMutation.mutateAsync(formData);
            alert("✅ 메뉴가 성공적으로 추가되었습니다.");
            setFormData(INITIAL_FORM_DATA);
            setIsAdding(false);
            setIsEditing(false);
        } catch (error) {
            alert("❌ 메뉴 추가 실패!");
        }
    };

    const handleUpdateMenuOnClick = async () => {
        try {
            await updateMenuMutation.mutateAsync({
                menuId: selectedMenu,
                formData,
            });
            alert("✅ 메뉴가 성공적으로 수정되었습니다.");
            setIsEditing(false);
        } catch (error) {
            alert("❌ 메뉴 수정 중 오류 발생!");
        }
    };

    const handleDeleteMenuOnClick = async () => {
        if (!selectedMenu) return alert("삭제할 메뉴를 선택하세요.");
        try {
            await deleteMenuMutation.mutateAsync(selectedMenu);
            alert("메뉴가 삭제되었습니다.");
            setSelectedMenu(null);
        } catch (error) {
            alert("메뉴 삭제 중 오류 발생!");
        }
    };

    return (
        <div css={s.container}>
            <div css={s.dropdownContainer}>
                <select
                    onChange={(e) => setSelectedMenu(Number(e.target.value))}
                    css={s.dropdown}
                    value={selectedMenu || ""}
                    disabled={isAdding}
                >
                    <option value="">메뉴를 선택해주세요</option>
                    {!isLoading && menus.length > 0 ? (
                        menus.map((menu) => (
                            <option key={menu.menuId} value={menu.menuId}>
                                {menu.menuName}
                            </option>
                        ))
                    ) : (
                        <option disabled>메뉴가 없습니다</option>
                    )}
                </select>
            </div>

            <div css={s.productContainer}>
                <div css={s.imageCon}>
                    <label css={s.imageBox} onClick={() => handleOpenModalOnClick("single")}>
                        {formData.singleImg ? (
                            <img src={formData.singleImg} alt="Single" />
                        ) : (
                            <span>단품 또는 M사이즈</span>
                        )}
                    </label>
                    <label css={s.imageBox} onClick={() => handleOpenModalOnClick("set")}>
                        {formData.setImg ? (
                            <img src={formData.setImg} alt="Set" />
                        ) : (
                            <span>세트 또는 L사이즈</span>
                        )}
                    </label>
                </div>

                <ImageModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    menus={menus}
                    imageType={selectedImageType}
                    onSelect={handleSelectImageOnSelect}
                    isAdding={isAdding}
                />

                <div css={s.inputGroup}>
                    <div>
                        <label css={s.label}>상품명</label>
                        <input
                            type="text"
                            css={s.input}
                            name="menuName"
                            value={formData.menuName}
                            onChange={handleInputValueOnChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div>
                        <label css={s.label}>카테고리</label>
                        <input
                            type="text"
                            css={s.input}
                            name="menuCategory"
                            value={formData.menuCategory}
                            onChange={handleInputValueOnChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div>
                        <label css={s.label}>상품 우선 순위</label>
                        <input
                            type="number"
                            css={s.input}
                            name="menuSequence"
                            value={formData.menuSequence}
                            onChange={handleInputValueOnChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div>
                        <label css={s.label}>노출 여부</label>
                        <Checkbox
                            name="isExposure"
                            checked={formData.isExposure === 1}
                            onChange={handleInputValueOnChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div>
                        <label css={s.label}>단품/M 사이즈 가격</label>
                        <input
                            type="number"
                            name="M"
                            value={formData.prices.find((p) => p.size === "M")?.price ?? ""}
                            onChange={handleInputValueOnChange}
                            css={s.input}
                            disabled={!isEditing}
                        />
                    </div>
                    <div>
                        <label css={s.label}>세트/L 사이즈 가격</label>
                        <input
                            type="number"
                            name="L"
                            value={formData.prices.find((p) => p.size === "L")?.price ?? ""}
                            onChange={handleInputValueOnChange}
                            css={s.input}
                            disabled={!isEditing}
                        />
                    </div>
                </div>
            </div>

            <div css={s.buttonGroup}>
                <button
                    onClick={handleSubmitMenuOnClick}
                    css={s.button}
                    disabled={isEditing && !isAdding}
                >
                    {isAdding ? "확인" : "메뉴 추가"}
                </button>
                <button
                    onClick={() => {
                        if (isEditing && !isAdding) {
                            handleUpdateMenuOnClick();
                        } else {
                            setIsEditing(true);
                        }
                    }}
                    css={s.button}
                    disabled={isAdding}
                >
                    {isEditing && !isAdding ? "확인" : "편집"}
                </button>
                <button
                    onClick={handleDeleteMenuOnClick}
                    css={s.button}
                    disabled={isEditing}
                >
                    삭제
                </button>
            </div>
        </div>
    );
}

export default AdminProductManage;
