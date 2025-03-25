import { useMutation } from "@tanstack/react-query";
import { isExistPhoneNumberApi } from "../apis/phoneNum";

// 전화번호가 등록된 상태인지 확인하는 요청을 처리하는 useMutation 훅
export const usePhoneNumberCheckMutation = () => useMutation({
    mutationKey: ["isExistPhoneNumberApi"],
    mutationFn: isExistPhoneNumberApi,
    retry: 0,
});
