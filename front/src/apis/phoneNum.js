import { api } from "../configs/axiosConfig";

// 전화번호가 등록된 상태인지 확인하는 요청
export const isExistPhoneNumberApi = async (phoneNum) => {
    const response = await api.post("/api/user/find", { phoneNumber: phoneNum });

    return response;
};

// phoneNumber, calcul, point