package com.korit.mcdonaldkiosk.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetail {
    private int orderDetailId;  // 주문 상세 ID
    private int orderId;        // 주문 ID
    private int menuPriceId;    // 메뉴 가격 ID
    private int menuCount;      // 메뉴 수량
    private int isSet;          // 세트 여부 (0: false, 1: true)
}
