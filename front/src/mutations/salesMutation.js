import { getSalesRequest, searchSalesByMenuRequest } from "../apis/AdminApi/AdminSalesApi";

export const searchSalesByMenu = () => useMutation({
    mutationKey: ["searchSalesByMenu"],
    mutationFn: searchSalesByMenuRequest,
    retry: 0,
});

export const getSales = () => useMutation({
    mutationKey: ["getSales"],
    mutationFn: getSalesRequest,
    retry: 0,
});