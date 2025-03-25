// api/pointApi.js
import { api } from "../configs/axiosConfig";

export const processPointApi = async ({ phoneNumber, calcul, point }) => {
    const response = await api.post("/api/user/processPoint", {
        phoneNumber,
        calcul,
        point,
    });
    return response.data;  // API 응답 데이터를 반환
};
