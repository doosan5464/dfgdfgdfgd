package com.korit.mcdonaldkiosk.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PayList {
    private int orderId;
    private String menuName;
    private int menuPrice;
    private int price;
    private int menuCount;
    private String size;
    private int totalPrice;
    private Date orderTime;
}
