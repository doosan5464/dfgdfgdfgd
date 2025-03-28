// getMenuHooks.js
import { useQuery } from '@tanstack/react-query'; // react-query v5는 @tanstack/react-query로 패키지명이 변경됨
import { fetchMenuData } from '../../apis/menuApi';  // menuApi에서 요청 함수 가져오기

// 메뉴 데이터를 가져오는 커스텀 훅
const menuForUser = () => {
    // useQuery 훅을 사용하여 서버에서 메뉴 데이터를 가져옴
    const { data, error, isLoading } = useQuery({
        queryKey: ['menuData'],  // queryKey를 배열로 수정
        queryFn: fetchMenuData
    });

    // data, error, isLoading 값을 반환
    return { data, error, isLoading };
};

export default menuForUser;


/*
[
DB메뉴 :  [
  {
    "menuId": 1,
    "menuName": "빅맥",
    "menuCategory": "버거",
    "menuSequence": 1,
    "singleImg": "https://www.mcdonalds.co.kr/upload/product/pcList/1583727841393.png",
    "setImg": "https://www.mcdonalds.co.kr/upload/product/pcList/1723562054997.png",
    "isExposure": 0,
    "menuPrice": [
      {
        "menuPriceId": 1,
        "menuId": 1,
        "size": "M",
        "menuPrice": 5500,
        "discountPrice": 5500
      }
    ]
  },
  {
    "menuId": 2,
    "menuName": "맥스파이시 상하이 버거",
    "menuCategory": "버거",
    "menuSequence": 2,
    "singleImg": "https://www.mcdonalds.co.kr/upload/product/pcList/1717486365975.png",
    "setImg": "https://www.mcdonalds.co.kr/upload/product/pcList/1723562636476.png",
    "isExposure": 0,
    "menuPrice": [
      {
        "menuPriceId": 2,
        "menuId": 2,
        "size": "M",
        "menuPrice": 5500,
        "discountPrice": 5500
      }
    ]
  },
  {
    "menuId": 3,
    "menuName": "1955 버거",
    "menuCategory": "버거",
    "menuSequence": 3,
    "singleImg": "https://www.mcdonalds.co.kr/upload/product/pcList/1599119588089.png",
    "setImg": "https://www.mcdonalds.co.kr/upload/product/pcList/1723564242231.png",
    "isExposure": 0,
    "menuPrice": [
      {
        "menuPriceId": 3,
        "menuId": 3,
        "size": "M",
        "menuPrice": 6400,
        "discountPrice": 6400
      }
    ]
  },
  ...
]
*/