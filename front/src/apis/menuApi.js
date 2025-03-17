import { api } from "../configs/axiosConfig";

// 메뉴 데이터를 가져오는 함수
export const fetchMenuData = async () => {
    const response = await api.get("/user/menu");
    return response.data;  // axios는 응답을 .data로 제공
};

/*
[
  {
    "menuId": 1,
    "menuName": "버거",
    "menuCategory": "세트",
    "menuSequence": 1,
    "singleImg": "burger.jpg",
    "setImg": "burger_set.jpg",
    "menuPrice": {
      "menuPriceId": 1,
      "menuId": 1,
      "size": "M"
      "menuPrice": 5000,
    }
  },
  ...
]
*/