import { api } from "../../configs/axiosConfig";

export const getCategoriesApi = async () => await api.get(`/api/admin/categories`);
export const getAllMenuListApi = async () => await api.get(`/api/admin/menus`);
//export const getMenuListByCategoryApi = async (params) => await api.get("/api/admin/list", {params});
export const updateExposureApi = async (params) => await api.put("/api/admin/isExposure", params);
export const getAllInfoMenuByIdApi = async (params) => await api.get("api/admin/menuinfo", params)