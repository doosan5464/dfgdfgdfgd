/**@jsxImportSource @emotion/react */
import * as s from './style';
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from 'react-router-dom';
import { selectedLanguageState } from '../../../atoms/selectedLanguage/selectedLanguage';
import { addedCart } from '../../../atoms/addedCart/addedCart';

function SelectMenu(props) {
    const navi = useNavigate();

    const images = [
        "https://www.mcdonalds.co.kr/upload/main/banner/1740439611431.jpg",
        "https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/XGW6JEEW4OZTAGYV5UHGMB7YEI.jpg",
        "https://www.cuonet.com/data/file/community2/2042141848_wpSGJBtm_1955EBB284EAB1B0.png",
        "https://i.kym-cdn.com/entries/icons/original/000/037/319/cover1.jpg",
    ];
    const [imageIndex, setImageIndex] = useState(0);

    const [selectedLanguage, setSelectedLanguage] = useRecoilState(selectedLanguageState); // 선택된 언어의 전역 상태 

    const [cart, setCart] = useRecoilState(addedCart); // 추가

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // 5초마다 변경

        return () => clearInterval(interval); // 언마운트 시 정리
    }, [images.length]);


    const handleLanguageClick = (language) => {
        if (selectedLanguage !== language) { 
            setSelectedLanguage(language);
            
            // 선택한 언어를 addedCart에 추가 (중복 방지)
            if (!cart.includes(language)) {
                setCart([...cart, language]);
            }
        }
    };

    const languageTexts = { // 언어별 텍스트 객체
        한국어: {
            selectLanguage: "언어를 선택하세요",
            selectLocation: "식사 장소를 선택하세요",
        },
        영어: {
            selectLanguage: "Please select a language",
            selectLocation: "Please choose your dining location",
        },
        중국어: {
            selectLanguage: "请选择语言",
            selectLocation: "请选择就餐地点",
        }
    };

    const handleToOrderOnClick = () => {
        navi("/order");
    }

    return (
        <>
            <header css={s.smImage}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt="키오스크 화면"
                        css={[s.imageStyle, { opacity: index === imageIndex ? 1 : 0, zIndex: index === imageIndex ? 1 : 0 }]}
                    />
                ))}
            </header>
            <main css={s.smChoice}>
                <h1>{languageTexts[selectedLanguage].selectLanguage}</h1>
                <div css={s.smLanguage}>
                    <span
                        css={selectedLanguage === "한국어" ? s.selectedLanguage : null}
                        onClick={() => handleLanguageClick("한국어")}>
                        한국어
                    </span>

                    <span
                        css={selectedLanguage === "영어" ? s.selectedLanguage : null}
                        onClick={() => handleLanguageClick("영어")}>
                        English
                    </span>

                    <span
                        css={selectedLanguage === "중국어" ? s.selectedLanguage : null}
                        onClick={() => handleLanguageClick("중국어")}>
                        中國語
                    </span>
                </div>
                <h1>{languageTexts[selectedLanguage].selectLocation}</h1>
                <div css={s.smHow}>
                    <span onClick={handleToOrderOnClick}>
                        <img src="https://www.mcdonalds.co.za/resources/img/McDonalds-Dine-In.png" alt="" />
                    </span>
                    <span onClick={handleToOrderOnClick}>
                        <img src="https://www.mcdonalds.co.za/resources/img/McDonalds-Takeout.png" alt="" />
                    </span>
                </div>
            </main>
            <footer>
                {/* Footer 내용 */}
            </footer>
        </>
    );
}

export default SelectMenu;