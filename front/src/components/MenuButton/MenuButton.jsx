/**@jsxImportSource @emotion/react */
import * as s from "./style";

function MenuButton({ img, menuName, price, onClick }) {
    // price가 객체일 경우, 객체의 값을 적절히 추출
    const displayPrice = typeof price === 'object' ? price.menuPrice : price; // menuPrice 속성만 추출하여 사용

    return (
        <div css={s.menuLayout}>
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
