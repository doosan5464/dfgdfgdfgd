/**@jsxImportSource @emotion/react */
import * as s from "./style";

function MenuButton({ img, menuName, price, onClick }) {
    // 가격이 배열로 전달되는 경우 첫 번째 요소에서 menuPrice를 가져오기
    const displayPrice = price && price.length > 0 ? price[0].menuPrice : '가격 정보 없음';  // 첫 번째 항목의 menuPrice를 사용

    return (
        <div>
            <button css={s.menu} onClick={onClick}>
                <div css={s.imglayout}>
                    <img src={img} alt="" />
                </div>
                <div css={s.menuListLayout}>
                    <h1 css={s.menuFont}>{menuName}</h1>
                    <div>
                        {/* 추가적인 내용이 필요하다면 여기에 추가 */}
                    </div>
                    <div css={s.priceFontLayout}>
                        {/* 가격을 출력 */}
                        <h1 css={s.priceFont}>{displayPrice}원</h1>
                    </div>
                </div>
            </button>
        </div>
    );
}

export default MenuButton;
