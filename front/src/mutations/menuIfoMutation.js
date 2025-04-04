import { useMutation } from "@tanstack/react-query";
import { updateMenuInfoApi } from "../apis/menuInfo";

export const useUpdateMenuInfo = () => {
    return useMutation({
        mutationFn: (menuInfo) => updateMenuInfoApi(menuInfo),
    });
};
