package com.korit.mcdonaldkiosk.service.user;

import com.korit.mcdonaldkiosk.dto.request.ReqPointDto;
import com.korit.mcdonaldkiosk.entity.Point;
import com.korit.mcdonaldkiosk.repository.user.PointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PointService {

    @Autowired
    private PointRepository pointRepository;

    // 포인트 적립 및 차감 처리
    public void processPoint(ReqPointDto reqPointDto, int calcul) {
        // 핸드폰 번호로 포인트 정보 조회
        Point findPoint = pointRepository.findByPhoneNumber(reqPointDto.getPhoneNumber());

        if (findPoint == null) {
            // 유저가 없다면 새 유저를 생성하고 포인트를 적립
            pointRepository.createNewUser(reqPointDto.getPhoneNumber());
            // 포인트 적립
            pointRepository.save(reqPointDto.getPhoneNumber(), reqPointDto.getPoint());
        } else {
            if (calcul == 0) {
                // 포인트 적립
                pointRepository.save(reqPointDto.getPhoneNumber(), reqPointDto.getPoint());
            } else if (calcul == 1) {
                // 포인트 차감
                pointRepository.update(reqPointDto.getPhoneNumber(), reqPointDto.getPoint());
            } else {
                throw new IllegalArgumentException("Invalid calcul value. It must be 0 for adding points or 1 for deducting points.");
            }
        }
    }
}
