import { api } from "../configs/axiosConfig";

// 메뉴 영양정보 리스트 조회 API
export const fetchMenuInfoListApi = async (menuId) => {
    if (!menuId) return [];
    try {
        const response = await api.get(`/api/admin/menuInfo/${menuId}`);
        return response.data;
    } catch (error) {
        console.error("❌ [fetchMenuInfoListApi] 요청 실패:", error);
        throw error;
    }
};

// 메뉴 영양 정보 및 원산지 수정
export const updateMenuInfoApi = async (menuInfo) => {
    try {
        const response = await api.put("/api/admin/menuInfo", menuInfo);
        return response.data;
    } catch (error) {
        console.error("❌ [updateMenuInfoApi] 요청 실패:", error);
        throw error;
    }
};