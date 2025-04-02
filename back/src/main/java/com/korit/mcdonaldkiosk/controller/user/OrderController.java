package com.korit.mcdonaldkiosk.controller.user;

import com.korit.mcdonaldkiosk.dto.request.ReqOrderDto;
import com.korit.mcdonaldkiosk.dto.request.ReqOrderDetailDto;
import com.korit.mcdonaldkiosk.service.user.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // order_tb
    @GetMapping("/orderId")
    public ResponseEntity<?> getOrderId() {
        try {
            return ResponseEntity.ok().body(orderService.getOrderId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 저장 실패: " + e.getMessage());
        }
    }

    // order_tb
    @PostMapping("/normal")
    public ResponseEntity<?> createOrder(@RequestBody ReqOrderDto dto) {
        try {
            orderService.createOrder(dto);  // 주문 추가 후 orderId 자동 설정
            return ResponseEntity.ok("주문이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 저장 실패: " + e.getMessage());
        }
    }

    // order_detail_tb
    @PostMapping("/detail")
    public ResponseEntity<?> createDetailOrder(@RequestBody List<ReqOrderDetailDto> dto) {
        try {
            orderService.createDetailOrder(dto);  // 주문 상세 항목 추가
            return ResponseEntity.ok("주문 상세 항목이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 저장 실패: " + e.getMessage());
        }
    }
}

