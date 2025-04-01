/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import * as s from "./style";

function ImageModal({ isOpen, onClose, menus = [], imageType, onSelect, isAdding }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [customImages, setCustomImages] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const dbImages = menus
            .filter((menu) => menu[imageType])
            .map((menu) => ({
                url: menu[imageType],
                name: menu.menuName,
                category: menu.menuCategory,
                fromDb: true, // 기존 DB 이미지 구분
            }));

        setImages([...dbImages, ...customImages]);
    }, [menus, imageType, customImages]);

    const categoryOptions = ["전체", ...new Set(images.map((img) => img.category || "직접 추가"))];

    const filteredImages =
        selectedCategory === "전체"
            ? images
            : images.filter((img) => img.category === selectedCategory);

    const imagesPerPage = 19;
    const totalPages = Math.ceil((filteredImages.length + 1) / imagesPerPage);
    const startIndex = (currentPage - 1) * imagesPerPage;
    const currentImages = filteredImages.slice(startIndex, startIndex + imagesPerPage);

    if (!isOpen) return null;

    const handleImgClick = (img) => {
        onSelect(img.url, img.name);
        onClose();
    };

    const handleAddImageClick = async () => {
        const url = prompt("추가할 이미지의 URL을 입력하세요:");
        if (!url) return;
    
        let name = "";
    
        // 단품(M)일 때만 상품명 입력 받기
        if (imageType === "singleImg") {
            name = prompt("이 이미지의 이름 (상품명) 을 입력하세요:");
            if (!name) return;
        }
    
        const newImg = {
            url,
            name,
            category: "직접 추가",
            fromDb: false,
        };
    
        setCustomImages((prev) => [...prev, newImg]);
        onSelect(url, name); // name은 빈 문자열일 수 있음
        onClose();
    };

    return (
        <div css={s.modalOverlay} onClick={onClose}>
            <div css={s.modalContent} onClick={(e) => e.stopPropagation()}>
                <button css={s.closeButton} onClick={onClose}>
                    X
                </button>

                <div css={s.topBar}>
                    <h3>이미지를 선택하세요</h3>
                    <select
                        css={s.categorySelect}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categoryOptions.map((cat, idx) => (
                            <option key={idx} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div css={s.imageGrid}>
                    <div css={s.imageBox} onClick={handleAddImageClick}>
                        <div css={s.addImageBox}>
                            <IoIosAdd size={40} />
                            <p>이미지 추가</p>
                        </div>
                    </div>

                    {currentImages.map((img, index) => (
                        <div key={index} css={s.imageBox}>
                            <img
                                src={img.url}
                                alt={img.name}
                                css={s.modalImage}
                                onClick={() => handleImgClick(img)}
                            />
                            <p css={s.imageLabel}>{img.name}</p>
                        </div>
                    ))}
                </div>

                <div css={s.pagination}>
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        ◀ 이전
                    </button>
                    <span>
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                    >
                        다음 ▶
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageModal;
