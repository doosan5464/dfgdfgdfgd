package com.korit.mcdonaldkiosk.controller.user;

import com.korit.mcdonaldkiosk.dto.request.ReqPointDto;
import com.korit.mcdonaldkiosk.entity.Point;
import com.korit.mcdonaldkiosk.service.user.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/user")
public class PointController {

    @Autowired
    private PointService pointService;

    @PostMapping("/processPoint")
    public ResponseEntity<String> processPoint(@RequestBody ReqPointDto reqPointDto) {
        try {
            // 포인트 적립 또는 차감 처리
            pointService.processPoint(reqPointDto, reqPointDto.getCalcul());

            // 처리 성공 시
            return ResponseEntity.ok("포인트 처리 성공");
        } catch (IllegalArgumentException e) {
            // 잘못된 계산 값이 전달되었을 경우
            return ResponseEntity.badRequest().body("Invalid calcul value");
        }
    }

    @GetMapping("/findPoint")
    public ResponseEntity<?> findPoint(@RequestParam String phoneNumber) {
        Point point = pointService.getPointByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "입력한 전화번호는 등록된 전화번호가 아닙니다."));
        return ResponseEntity.ok().body(point);
    }

    @PutMapping("/usePoint")
    public ResponseEntity<?> usePoint(@RequestBody ReqPointDto reqPointDto) {
        try {
            // 포인트 적립 또는 차감 처리
            pointService.processPoint(reqPointDto, reqPointDto.getCalcul());

            // 처리 성공 시
            return ResponseEntity.ok("포인트 처리 성공");
        } catch (IllegalArgumentException e) {
            // 잘못된 계산 값이 전달되었을 경우
            return ResponseEntity.badRequest().body("Invalid calcul value");
        }
    }

}
