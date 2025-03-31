// hooks/useProcessPointMutation.js
import { useMutation } from "@tanstack/react-query";
import { getPointApi, processPointApi, usePointApi } from "../apis/pointApi";  // processPointApi import

export const useProcessPointMutation = () => useMutation({
    mutationKey: ["processPointMutation"],
    mutationFn: processPointApi,
    retry: 0,  // 실패 시 재시도 횟수를 0으로 설정 (원하는 값으로 설정 가능)
});

export const findPointMutation = () => useMutation({
    mutationKey: ["findPointMutation"],
    mutationFn: getPointApi,
    retry: 0,
})

export const usePointMutation = () => useMutation({
    mutationKey: ["usePointMutation"],
    mutationFn: usePointApi,
    retry: 0,
})
