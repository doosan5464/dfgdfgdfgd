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

export const getPointApi = async (phoneNumber) => {
    try {
      const response = await api.get(`/api/user/findPoint?phoneNumber=${phoneNumber}`);
      return response.data; // 성공적인 응답 반환
    } catch (error) {
      if (error.response) {
        // 서버에서 오류를 응답으로 보낸 경우
        if (error.response.status === 404) {
          throw new Error("입력하신 번호는 등록된 번호가 아닙니다.");
        } else {
          throw new Error("서버에서 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else if (error.request) {
        // 요청은 했으나 응답이 없을 경우
        throw new Error("서버와 연결할 수 없습니다. 인터넷 연결을 확인해주세요.");
      } else {
        // 다른 종류의 에러
        throw new Error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  export const usePointApi = async ({ phoneNumber, calcul, point }) => {
    if (!phoneNumber) {
        console.error("⚠️ phoneNumber가 없습니다. API 호출을 중단합니다.");
        return null;
    }

    const response = await api.put(`/api/user/usePoint?phoneNumber=${phoneNumber}`, {
        phoneNumber,
        calcul,
        point,
    });

    return response.data;
};
  
