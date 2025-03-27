package com.korit.mcdonaldkiosk.dto.request;

import lombok.Data;

@Data
public class ReqMenuPriceDto {
    private String size;
    private int menuPrice;
    private int discountPrice;
}
