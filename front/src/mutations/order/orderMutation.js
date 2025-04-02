import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postOrderDetailApi, postOrderTbApi } from "../../apis/orderApi";

export const postOrderTb = () => useMutation({
    mutationKey: ["postOrderTb"],
    mutationFn: postOrderTbApi,
    retry: 0,
});

export const postOrderDetailTb = () => useMutation({
    mutationKey: ["postOrderDetailTb"],
    mutationFn: postOrderDetailApi,
    retry: 0,
})