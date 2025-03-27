import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMenuApi, adminFetchMenuApi, deleteMenuApi, updateMenuApi } from '../apis/menuApi';
import axios from "axios";

// 메뉴 추가
export const useAddMenuMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addMenuApi,
        onSuccess: () => {
            queryClient.invalidateQueries(["menuData"]);
        },
        onError: (error) => {
        },
    });
};

// 메뉴 수정
export const useUpdateMenuMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ menuId, formData }) => updateMenuApi(menuId, formData),
		onSuccess: () => {
			queryClient.invalidateQueries(["menuData"]);
		},
		onError: (error) => {
			console.error("❌ [useUpdateMenuMutation] 메뉴 수정 실패:", error);
		},
	});
};

// 메뉴 삭제
export const useDeleteMenuMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteMenuApi, // api에서 delete 요청 보냄
        onSuccess: () => {
            queryClient.invalidateQueries(["menuData"]); // 캐시 갱신
        },
        onError: (error) => {
        },
    });
};

export const getAllMenuMutation = () => useMutation({
    mutationKey: ["getAllMenuMutation"],
    mutationFn: adminFetchMenuApi,
    retry: 0,
});
