/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { Checkbox } from "@mui/material";
import { useAddMenuMutation, useDeleteMenuMutation } from "../../../mutations/menuMutation";
import useMenuData, { useMenuDetail } from "../../../hooks/menu/getMenuHooks";
import ImageModal from "../AdminMenuImagine/AdminMenuImagine";


function AdminProductManage() {
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [selectedImageType, setSelectedImageType] = useState("");

    const [formData, setFormData] = useState({
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
    });

    const { data: menus = [], error, isLoading } = useMenuData();
    const { data: menuDetail } = useMenuDetail(selectedMenu);
    const addMenuMutation = useAddMenuMutation();
    const deleteMenuMutation = useDeleteMenuMutation();

    useEffect(() => {
        if (!selectedMenu && Array.isArray(menus) && menus.length > 0 && menus[0]?.menuId) {
            setSelectedMenu(menus[0].menuId);
        }
    }, [menus]);

    useEffect(() => {
        if (!menuDetail || typeof menuDetail !== "object") {
            console.warn("⚠️ [useEffect] 메뉴 데이터가 올바르지 않습니다.", menuDetail);
            return;
        }

        console.log("🔥 [useEffect] 불러온 메뉴 정보: ", menuDetail);

        setFormData({
            menuCategory: menuDetail.menuCategory || "",
            menuName: menuDetail.menuName || "",
            menuSequence: menuDetail.menuSequence || 0,
            isExposure: menuDetail.isExposure ?? 1,
            singleImg: menuDetail.singleImg || null,
            setImg: menuDetail.setImg || null,
            prices: Array.isArray(menuDetail.menuPrice) 
            ? menuDetail.menuPrice.map((price) => ({
                size: price.size,
                price: price.menuPrice || "",
                discountPrice: price.discountPrice || "",
            }))
        : [],});
    }, [menuDetail]);

    // 이미지 모달 열기
    const handleOpenModalOnClick = (type) => {
        setSelectedImageType(type);
        const selectedImages =
            type === "single"
            ? menus.map((menu) => menu.singleImg).filter(Boolean)
            : menus.map((menu) => menu.setImg).filter(Boolean);
        setImageList(selectedImages);
        setModalOpen(true);
        };

    // 이미지 선택 시 formData에 반영
    const handleSelectImage = (imgUrl) => {
        setFormData((prev) => ({
            ...prev,
            [selectedImageType === "single" ? "singleImg" : "setImg"]: imgUrl,
        }));
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
            setFormData((prev) => ({
                ...prev,
                prices: prev.prices.map((p) =>
                p.size === name ? { ...p, price: value } : p
            ),}));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmitMenuOnClick = async () => {
        try {
            await addMenuMutation.mutateAsync(formData);
            alert("메뉴가 추가되었습니다.");
        } catch (error) {
            console.error("메뉴 추가 실패:", error);
            alert("메뉴 추가 중 오류 발생!");
        }
    };

    const handleDeleteMenuOnClick = async () => {
        if (!selectedMenu) return alert("삭제할 메뉴를 선택하세요.");

        try {
            await deleteMenuMutation.mutateAsync(selectedMenu);
            alert("메뉴가 삭제되었습니다.");
        } catch (error) {
            console.error("메뉴 삭제 실패:", error);
            alert("메뉴 삭제 중 오류 발생!");
        }
    };

    return (
        <div css={s.container}>
            {/* 메뉴 선택 드롭다운 */}
            <div css={s.dropdownContainer}>
                <select
                onChange={(e) => setSelectedMenu(Number(e.target.value))}
                css={s.dropdown}
                value={selectedMenu || ""}
                >
                <option value="">메뉴를 선택해주세요</option>
                {!isLoading && menus.length > 0 ? (
                    menus?.filter(menu => menu && menu.menuId).map(menu => (
                    <option key={menu.menuId} value={menu.menuId}>
                        {menu.menuName}
                    </option>
                    ))              
                ) : (
                    <option disabled>메뉴가 없습니다</option>
                )}
                </select>
            </div>

            {/* 상품 정보 입력 */}
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
                    images={imageList}
                    onSelect={handleSelectImage}
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
                            disabled={selectedMenu !== null}
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
                            disabled={selectedMenu !== null}
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
                            disabled={selectedMenu !== null}
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
                            value={
                            formData.prices.find((p) => p.size === "M")?.price ?? ""
                            }
                            onChange={handleInputValueOnChange}
                            css={s.input}
                            disabled={selectedMenu !== null}
                        />
                    </div>
                    <div>
                        <label css={s.label}>세트/L 사이즈 가격</label>
                        <input
                            type="number"
                            name="L"
                            value={
                            formData.prices.find((p) => p.size === "L")?.price ?? ""
                            }
                            onChange={handleInputValueOnChange}
                            css={s.input}
                            disabled={selectedMenu !== null}
                        />
                    </div>
                </div>
            </div>

            <div css={s.buttonGroup}>
                <button onClick={() => setIsEditing(true)} css={s.button}>
                    편집
                </button>
                <button
                    onClick={handleSubmitMenuOnClick}
                    css={s.button}
                    disabled={!isEditing}
                    >
                    추가
                </button>
                <button onClick={handleDeleteMenuOnClick} css={s.button}>
                삭제
                </button>
            </div>
        </div>
    );
}

export default AdminProductManage;
