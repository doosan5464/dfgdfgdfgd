import { api } from "../configs/axiosConfig";

// 가장 최신 orderId를 가져옴. 락 걸어서 동시성 해결
export const getOrderIdApi = async () => {
    const response = await api.get("/orders/orderId");
    return response.data;
}

// order_tb로 post
export const postOrderTbApi = async (orderData) => {
    const response = await api.post("/orders/normal", orderData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

// order_detail_tb로 post
export const postOrderDetailApi = async (orderDetailData) => {
    const response = await api.post("/orders/detail", orderDetailData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

