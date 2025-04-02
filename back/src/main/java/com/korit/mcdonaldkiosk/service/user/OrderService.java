package com.korit.mcdonaldkiosk.service.user;

import com.korit.mcdonaldkiosk.dto.request.ReqOrderDto;
import com.korit.mcdonaldkiosk.dto.request.ReqOrderDetailDto;
import com.korit.mcdonaldkiosk.repository.user.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Transactional(rollbackFor = Exception.class)
    public void createOrder(ReqOrderDto dto) {
        orderRepository.addOrder(dto);
    }

    @Transactional(rollbackFor = Exception.class)
    public void createDetailOrder(List<ReqOrderDetailDto> dto) {

        orderRepository.addOrderDetails(dto);
    }

    @Transactional(rollbackFor = Exception.class)
    public int getOrderId() {
        return orderRepository.getLatestOrderIdForLock();
    }
}
