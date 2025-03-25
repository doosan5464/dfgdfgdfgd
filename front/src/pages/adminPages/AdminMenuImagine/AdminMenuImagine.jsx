/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";

function ImageModal({ isOpen, onClose, images, onSelect }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUrl, setSelectedUrl] = useState(null);

  const imagesPerPage = 25;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const startIndex = (currentPage - 1) * imagesPerPage;
  const currentImages = images.slice(startIndex, startIndex + imagesPerPage);

  if (!isOpen) return null;

  const handleClick = (img) => {
    setSelectedUrl(img);
    onSelect(img);
    onClose();
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div css={s.modalOverlay} onClick={onClose}>
      <div css={s.modalContent} onClick={(e) => e.stopPropagation()}>
        <button css={s.closeButton} onClick={onClose}>X</button>
        <h3>이미지를 선택하세요</h3>

        <div css={s.imageGrid}>
          {currentImages.length > 0 ? (
            currentImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="메뉴 이미지"
                css={[
                  s.modalImage,
                  selectedUrl === img && s.selectedImage,
                ]}
                onClick={() => handleClick(img)}
              />
            ))
          ) : (
            <p>이미지가 없습니다.</p>
          )}
        </div>

        <div css={s.pagination}>
          <button onClick={handlePrev} disabled={currentPage === 1}>
            ◀ 이전
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            다음 ▶
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
