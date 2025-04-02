import { useQuery } from "@tanstack/react-query";
import { adminFetchMenuApi, fetchAllMenuImages, fetchMenuDetailApi } from "../../apis/menuApi";

// 전체 메뉴 목록 가져오기
const useMenuData = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["menuData"],
        queryFn: async () => {
            try {
                const response = await adminFetchMenuApi();
                return response || [];
            } catch (err) {
                return [];
            }
        },
        staleTime: 1000 * 60 * 5,
    });

    return { data, error, isLoading };
};

// 특정 메뉴 상세 정보 가져오기
export const useMenuDetail = (menuId) => {
    const { data, error } = useQuery({
        queryKey: ["menuDetail", menuId],
        queryFn: async () => {
            if (!menuId) return null;
            try {
                const response = await fetchMenuDetailApi(menuId);
                return response || null;
            } catch (err) {
                return null;
            }
        },
        enabled: !!menuId,
    });

    return { data, error };
};

// 이미지 모달용 메뉴 이미지 가져오기
export const useMenuImageList = () => {
    return useQuery({
        queryKey: ["menuImageList"],
        queryFn: fetchAllMenuImages,
        staleTime: 1000 * 60 * 5,
    });
};

export default useMenuData;