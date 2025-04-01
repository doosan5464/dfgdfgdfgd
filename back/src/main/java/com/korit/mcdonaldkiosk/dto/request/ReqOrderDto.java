package com.korit.mcdonaldkiosk.dto.request;

import lombok.Data;


@Data
public class ReqOrderDto {
    private int orderTempId;
    private int totalPrice;
}