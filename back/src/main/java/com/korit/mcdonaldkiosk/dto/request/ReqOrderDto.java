package com.korit.mcdonaldkiosk.dto.request;

import lombok.Data;
import java.util.List;


@Data
public class ReqOrderDto {
    private int orderId;
    private int orderTempId;
    private int totalPrice;
}