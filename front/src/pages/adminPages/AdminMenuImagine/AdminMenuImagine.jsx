/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import * as s from "./style";

function ImageModal({ isOpen, onClose, menus = [], imageType, onSelect }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [filteredImages, setFilteredImages] = useState([]);
    const [selectedUrl, setSelectedUrl] = useState(null);

    const images = menus
        .filter((menu) => menu[imageType])
        .map((menu) => ({
            url: menu[imageType],
            name: menu.menuName,
            category: menu.menuCategory,
        }));

    const categoryOptions = ["전체", ...new Set(images.map((img) => img.category))];

    useEffect(() => {
        const filtered = selectedCategory === "전체"
            ? images
            : images.filter((img) => img.category === selectedCategory);

        setFilteredImages(filtered);
        setCurrentPage(1);
    }, [selectedCategory, imageType, menus]);

    const imagesPerPage = 20;
    const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
    const startIndex = (currentPage - 1) * imagesPerPage;
    const currentImages = filteredImages.slice(startIndex, startIndex + imagesPerPage);

    if (!isOpen) return null;

    const handleImgClick = (img) => {
        setSelectedUrl(img.url);
        onSelect(img.url);
        onClose();
    };

    return (
        <div css={s.modalOverlay} onClick={onClose}>
            <div css={s.modalContent} onClick={(e) => e.stopPropagation()}>
                <button css={s.closeButton} onClick={onClose}>X</button>

                <div css={s.topBar}>
                    <h3>이미지를 선택하세요</h3>
                    <select
                        css={s.categorySelect}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categoryOptions.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div css={s.imageGrid}>
                    {currentImages.map((img, index) => (
                        <div key={index} css={s.imageBox}>
                            <img
                                src={img.url}
                                alt={img.name}
                                css={[s.modalImage, selectedUrl === img.url && s.selectedImage]}
                                onClick={() => handleImgClick(img)}
                            />
                            <p css={s.imageLabel}>{img.name}</p>
                        </div>
                    ))}
                </div>

                <div css={s.pagination}>
                    <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                        ◀ 이전
                    </button>
                    <span>{currentPage} / {totalPages}</span>
                    <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                        다음 ▶
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageModal;
