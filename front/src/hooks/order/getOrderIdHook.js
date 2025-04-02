import { useQuery } from "@tanstack/react-query";
import { getOrderIdApi } from "../../apis/orderApi";

// 가장 최신 orderId를 가져오는 훅
export const useOrderId = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["getOrderIdFromTb"],
        queryFn: async () => {
            try {
                const response = await getOrderIdApi();  // 실제 API 호출
                console.log("최신(주문한) orderId 받아온 response:", response);
                return response || null;
            } catch (err) {
                console.error("getOrderIdApi API 요청 실패:", err);
                return null;
            }
        },
        staleTime: 1000 * 60 * 5,
    });

    return { data, error, isLoading };
};
