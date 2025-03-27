// getMenuHooks.js
import { useQuery } from '@tanstack/react-query'; // react-query v5는 @tanstack/react-query로 패키지명이 변경됨
import { adminFetchMenuApi, fetchAllMenuImages, fetchMenuDetailApi } from '../../apis/menuApi';  // menuApi에서 요청 함수 가져오기

// 메뉴 데이터를 가져오는 커스텀 훅
const useMenuData = () => {
    // useQuery 훅을 사용하여 서버에서 메뉴 데이터를 가져옴
    const { data, error, isLoading } = useQuery({
        queryKey: ['menuData'], // queryKey를 배열로 수정
        queryFn: async () => {
            try {
                const response = await adminFetchMenuApi();
                return response || [];
            } catch (err) {
                return [];
            }
        },
        staleTime: 5 * 60 * 1000,  // 5분 캐싱
    });

    // data, error, isLoading 값을 반환
    return { data, error, isLoading };
};

// 특정 메뉴 가져오는 Hook
export const useMenuDetail = (menuId) => {
    const { data, error } = useQuery({
        queryKey: ['menuDetail', menuId],
        queryFn: async () => {
            if (!menuId) return null;

            try {
                const response = await fetchMenuDetailApi(menuId); // response 변수에 할당

                return response || null;
            } catch (err) {
                return null;
            }
        },
        enabled: !!menuId,
    });

    return { data, error };
};

// 페이지네이션용
export const useMenuImageList = () => {
    return useQuery({
        queryKey: ["menuImageList"],
        queryFn: fetchAllMenuImages,
        staleTime: 1000 * 60 * 5,
    });
};

export default useMenuData;