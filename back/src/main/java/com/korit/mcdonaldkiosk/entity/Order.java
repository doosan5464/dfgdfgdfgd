package com.korit.mcdonaldkiosk.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Order {
    private int orderId;      // 주문 ID (DB에서 생성)
    private int orderTempId;  // 임시 주문 ID
    private int totalPrice;   // 총 가격
}
