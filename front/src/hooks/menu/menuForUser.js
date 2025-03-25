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
333Item 24: {
  "menuId": 24,
  "menuName": "베이컨 토마토 에그 머핀",
  "menuCategory": "맥모닝",
  "menuSequence": 5,
  "singleImg": "https://www.mcdonalds.co.kr/upload/product/pcList/1646207398160.png",
  "setImg": "https://www.mcdonalds.co.kr/upload/product/pcList/1677677491958.png",
  "isExposure": 1,
  "menuPrice": [
    {
      "menuPriceId": 0,
      "menuId": 24,
      "size": "L",
      "menuPrice": 5700,
      "discountPrice": 0
    },
    {
      "menuPriceId": 0,
      "menuId": 24,
      "size": "M",
      "menuPrice": 3700,
      "discountPrice": 0
    }
  ]
}
  ...
]
*/