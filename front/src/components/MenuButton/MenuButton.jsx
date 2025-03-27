/**@jsxImportSource @emotion/react */
import * as s from "./style";

function MenuButton({ img, menuName, price, onClick }) {
    return (
        <div css={s.menuLayout}>
            <button css={s.menu} onClick={onClick}>
                <div css={s.imglayout}>
                    <img src={img} alt="" />
                </div>
                <div css={s.menuListLayout}>
                    <h1 css={s.menuFont}>{menuName}</h1>
                    <div>

                    </div>
                    <div css={s.priceFontLayout}>
                        <h1 css={s.priceFont}>{price}원</h1>
                    </div>
                </div>
            </button>
        </div>
    );
}

export default MenuButton;