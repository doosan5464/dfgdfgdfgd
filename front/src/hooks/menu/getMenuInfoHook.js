import { useQuery } from "@tanstack/react-query";
import { fetchMenuInfoApi } from "../../apis/menuInfo";

export const useMenuInfo = (menuId) => {
    return useQuery({
        queryKey: ["menuInfo", menuId],
        queryFn: () => fetchMenuInfoApi(menuId),
        enabled: !!menuId,
    });
};