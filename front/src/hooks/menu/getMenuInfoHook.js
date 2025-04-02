import { useQuery } from "@tanstack/react-query";
import { fetchMenuInfoListApi } from "../../apis/menuInfo";

// 메뉴 영양정보 리스트 조회
export const useMenuInfoList = (menuId) => {
    return useQuery({
        queryKey: ["menuInfoList", menuId],
        queryFn: () => fetchMenuInfoListApi(menuId),
        enabled: !!menuId,
    });
};