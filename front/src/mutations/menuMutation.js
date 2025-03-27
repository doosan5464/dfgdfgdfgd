import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMenuApi, deleteMenuApi, updateMenuApi } from '../apis/menuApi';
import axios from "axios";

// 메뉴 추가 (POST) → useMutation 사용
export const useAddMenuMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addMenuApi,
        onSuccess: () => {
            console.log("✅ [useAddMenuMutation] 메뉴 추가 성공");
            queryClient.invalidateQueries(['menuData']);
            alert("메뉴가 추가되었습니다!");
        },
        onError: (error) => {
            console.error("❌ [useAddMenuMutation] 메뉴 추가 실패:", error);
            alert("메뉴 추가 중 오류가 발생했습니다.");
        },
    });
  };

// 메뉴 삭제 (DELETE) → useMutation 사용
export const useDeleteMenuMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteMenuApi,
        onSuccess: () => {
            console.log("✅ [useDeleteMenuMutation] 메뉴 삭제 성공");
            queryClient.invalidateQueries(['menuData']); // 삭제 후 메뉴 목록 갱신
        },
        onError: (error) => {
            console.error("❌ [useDeleteMenuMutation] 메뉴 삭제 실패:", error);
        },
    });
};

export const useUpdateMenuMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateMenuApi,
        onSuccess: () => {
            queryClient.invalidateQueries(["menuData"]);
            alert("메뉴가 성공적으로 수정되었습니다.");
        },
        onError: (error) => {
            console.error("메뉴 수정 실패:", error);
            alert("메뉴 수정 중 오류가 발생했습니다.");
        },
    });
};
