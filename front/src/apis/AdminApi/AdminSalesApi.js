import { api } from "../../configs/axiosConfig";
import { instance, portOneInstance } from "../utils/instance";

export const getSalesRequest = async () => {
    try {
        const response = await api.get("/admin/sales");
        console.log("🔥 [getSalesRequest] 전체 메뉴 응답:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ [getSalesRequest] API 요청 실패:", error);
        throw error;
    }
  };

export const searchSalesByMenuRequest = async () => {
    try {
          const response = await api.get("/admin/menusales");
          console.log("🔥 [searchSalesByMenuRequest] 전체 메뉴 응답:", response.data);
          return response.data;
      } catch (error) {
          console.error("❌ [searchSalesByMenuRequest] API 요청 실패:", error);
          throw error;
      }
    };



export const getPaymentsRequest = async () => {
    return await portOneInstance.get("/payments", {
        headers: {
            Authorization: `Bearer ${import.meta.env.REACT_APP_PORTONE_API_SECRET_KEY}`,
        },
        params: {
            requestBody: JSON.stringify({
                page: {
                    size: 1000,
                },
                filter: {
                    storeId: import.meta.env.REACT_APP_STORE_ID,
                    isTest: true,
                },
            }),
        },
    });
};

export const paymentsCancelRequest = async (id) => {
    return await portOneInstance.post(
        `/payments/${id}/cancel`,
        {
            reason: "reason",
        },
        {
            headers: {
                Authorization: `Bearer ${import.meta.env.REACT_APP_PORTONE_API_SECRET_KEY}`,
            },
        }
    );
};
