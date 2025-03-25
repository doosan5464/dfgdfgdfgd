import { useQuery } from '@tanstack/react-query';
import { adminFetchMenuApi, fetchMenuDetailApi } from '../../apis/menuApi';

// 메뉴 목록 가져오는 Hook
const useMenuData = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['menuData'],
        queryFn: async () => {
            try {
                const response = await adminFetchMenuApi();
                return response || [];
            } catch (err) {
                console.error("❌ [useMenuData] API 요청 실패:", err);
                return [];
            }
        },
        staleTime: 5 * 60 * 1000,  // 5분 캐싱
    });

    console.log("🔥 [useMenuData] 전체 메뉴 응답:", data);
    if (error) console.error("❌ [useMenuData] 오류 발생:", error);

    return { data, error, isLoading };
};

// 특정 메뉴 가져오는 Hook
export const useMenuDetail = (menuId) => {
    const { data, error } = useQuery({
        queryKey: ['menuDetail', menuId],
        queryFn: async () => {
            if (!menuId) return null;

            try {
                const response = await fetchMenuDetailApi(menuId); // ✅ response 변수에 할당
                console.log("🔥 [useMenuDetail] 받아온 response:", response);

                return response || null;
            } catch (err) {
                console.error("❌ [useMenuDetail] API 요청 실패:", err);
                return null;
            }
        },
        enabled: !!menuId,
    });

    console.log(`🔥 [useMenuDetail] 선택한 메뉴(${menuId}) 응답:`, data);
    return { data, error };
};

export default useMenuData;