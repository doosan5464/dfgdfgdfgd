import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMenuApi, deleteMenuApi, updateMenuApi } from "../apis/menuApi";

// 메뉴 추가
export const useAddMenuMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addMenuApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["menuData"]});
        },
        onError: (error) => {
            console.error("❌ [useAddMenuMutation] 메뉴 추가 실패:", error);
        },
    });
};

// 메뉴 수정
export const useUpdateMenuMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ menuId, formData }) => updateMenuApi(menuId, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["menuData"]});
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
        mutationFn: deleteMenuApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["menuData"]});
        },
        onError: (error) => {
            console.error("❌ [useDeleteMenuMutation] 메뉴 삭제 실패:", error);
        },
    });
};
