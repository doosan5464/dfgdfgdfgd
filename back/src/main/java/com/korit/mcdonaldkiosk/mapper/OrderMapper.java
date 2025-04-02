package com.korit.mcdonaldkiosk.mapper;

import com.korit.mcdonaldkiosk.dto.request.ReqOrderDetailDto;
import com.korit.mcdonaldkiosk.dto.request.ReqOrderDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderMapper {

    // 락을 걸고 가장 최근 주문의 orderId를 조회
    int getLatestOrderIdForLock();

    // 주문 추가
    void addOrderList(ReqOrderDto order);

    // 주문 상세 항목 추가
    void addOrders(List<ReqOrderDetailDto> orderDetails);
}
