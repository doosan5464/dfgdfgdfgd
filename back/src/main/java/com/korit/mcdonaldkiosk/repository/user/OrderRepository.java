package com.korit.mcdonaldkiosk.repository.user;

import com.korit.mcdonaldkiosk.dto.request.ReqOrderDetailDto;
import com.korit.mcdonaldkiosk.dto.request.ReqOrderDto;
import com.korit.mcdonaldkiosk.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderRepository {

    @Autowired
    private OrderMapper orderMapper;

    // 주문 추가
    public void addOrder(ReqOrderDto order) {
        orderMapper.addOrderList(order);
    }

    // 주문 상세 항목 추가
    public void addOrderDetails(List<ReqOrderDetailDto> orderDetails) {
        orderMapper.addOrders(orderDetails);
    }

    // 락을 걸고 가장 최근 주문의 orderId를 조회
    public int getLatestOrderIdForLock() {
        return orderMapper.getLatestOrderIdForLock();
    }
}