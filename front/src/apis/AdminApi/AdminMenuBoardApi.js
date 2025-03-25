import { api } from "../../configs/axiosConfig";

export const getCategoriesApi = async () => await api.get(`/api/admin/categories`);
export const getAllMenuListApi = async () => await api.get(`/api/admin/menus`);
export const updateExposureApi = async (params) => await api.put("/api/admin/isExposure", params);
export const getAllInfoMenuByIdApi = async (params) => await api.get("/api/admin/menuinfo", {params});
// 풀어 쓴 형태 - 학습용 삭제 ㄴㄴ
// export const getAllInfoMenuByIdApi = async (params) => {
//     const option = {
//         "params": params,
//     }
//     return await api.get("/api/admin/menuinfo", option);
// } //params: {menuId}