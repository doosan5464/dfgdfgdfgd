package com.korit.mcdonaldkiosk.mapper;

import com.korit.mcdonaldkiosk.dto.request.ReqOrderDetailDto;
import com.korit.mcdonaldkiosk.dto.request.ReqOrderDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderMapper {

    // 주문 추가
    void addOrderList(ReqOrderDto order);

    // 주문 상세 항목 추가
    void addOrders(List<ReqOrderDetailDto> orderDetails);

    // 가장 최근에 추가된 주문의 orderId 조회
    int getLatestOrderId();  // 가장 최근 주문의 orderId를 반환하는 메서드

}