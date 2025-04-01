package com.korit.mcdonaldkiosk.dto.request;

import lombok.Data;

@Data
public class ReqOrderDetailDto {
    private int menuPriceId;
    private int menuCount;
    private int isSet;
}
