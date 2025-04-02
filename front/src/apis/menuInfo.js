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