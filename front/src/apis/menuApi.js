import { api } from "../configs/axiosConfig";

// 메뉴 데이터를 가져오는 함수
export const fetchMenuData = async () => {
    const response = await api.get("/user/menu");

    // 받아온 데이터 가공 (menuPrice를 size 기준으로 정렬)
    const sortedData = response.data.map((item) => ({
        ...item,
        menuPrice: item.menuPrice.sort((a, b) => {
            const sizeOrder = ["M", "L"];  // 원하는 size 순서 정의
            return sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size);  // M이 L보다 먼저 오도록 정렬
        })
    }));

    return sortedData;
};


// 관리자용 전체 메뉴 목록 가져오기
export const adminFetchMenuApi = async () => {
  try {
      const response = await api.get("/api/admin/menus");
      console.log("🔥 [adminFetchMenuApi] 전체 메뉴 응답:", response.data);
      return response.data;
  } catch (error) {
      console.error("❌ [adminFetchMenuApi] API 요청 실패:", error);
      throw error;
  }
};


// 특정 메뉴 상세 정보 가져오기
export const fetchMenuDetailApi = async (menuId) => {
  if (!menuId) {
      console.warn("⚠️ [fetchMenuDetail] menuId가 없습니다.");
      return null;
  }

  try {
      const response = await api.get(`/api/admin/menus/${menuId}`);
      console.log(`🔥 [fetchMenuDetail] 선택한 메뉴(${menuId}) 응답:`, response.data);
      return response.data;
  } catch (error) {
      console.error("❌ [fetchMenuDetail] API 요청 실패:", error);
      throw error;
  }
};

// 메뉴 추가 (FormData 사용)
export const addMenuApi = async (formData) => {
  const token = localStorage.getItem("AccessToken");
  if (!token) throw new Error("❌ 인증 정보 없음! 다시 로그인해주세요.");

  const data = new FormData();
  data.append("menuName", formData.menuName);
  data.append("menuCategory", formData.menuCategory);
  data.append("menuSequence", formData.menuSequence);
  data.append("isExposure", formData.isExposure);
  data.append("prices", JSON.stringify(formData.prices)); // JSON 문자열로 가격 리스트 전송

  if (formData.singleImg) data.append("singleImg", formData.singleImg);
  if (formData.setImg) data.append("setImg", formData.setImg);

  try {
      const response = await api.post("/api/admin/menus", data, {
          headers: {
              Authorization: `Bearer ${token}`,
              // Content-Type 생략: axios가 FormData일 때 자동으로 multipart/form-data 설정함
          },
      });
      console.log("✅ [addMenuApi] 메뉴 추가 성공:", response.data);
      return response.data;
  } catch (error) {
      console.error("❌ [addMenuApi] 메뉴 추가 실패:", error);
      throw error;
  }
};


// 메뉴 삭제
export const deleteMenuApi = async (menuId) => {
  const token = localStorage.getItem("AccessToken");
  if (!token) throw new Error("❌ 인증 정보 없음! 다시 로그인해주세요.");

  try {
      const response = await api.delete(`/api/admin/menus/${menuId}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      console.log(`✅ [deleteMenuApi] 메뉴(${menuId}) 삭제 성공:`, response.data);
      return response.data;
  } catch (error) {
      console.error("❌ [deleteMenuApi] 메뉴 삭제 실패:", error);
      throw error;
  }
};

//카테고리ID로 메뉴찾아오기
export const getMenuRequest = async (categoryId) => {
  return await instance.get(`/menus?categoryId=${categoryId}`);
};





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