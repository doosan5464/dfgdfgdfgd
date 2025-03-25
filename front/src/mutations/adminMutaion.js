import { useMutation } from "@tanstack/react-query";
import { updateExposureApi } from "../apis/AdminApi/AdminMenuBoardApi";

//메뉴 노출 여부
export const useUpdateIsPosureMutation = () => useMutation({
    mutationKey: ["useUpdateIsPosureMutation"],
    mutationFn: updateExposureApi,
    retry: 0,
});