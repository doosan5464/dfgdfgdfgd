package com.korit.mcdonaldkiosk.repository.user;

import com.korit.mcdonaldkiosk.entity.Point;
import com.korit.mcdonaldkiosk.mapper.PointMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PointRepository {

    @Autowired
    private PointMapper pointMapper;

    // 포인트 적립 메서드
    public void save(String phoneNumber, int point) {
        try {
            // phoneNumber를 int로 변환 (phoneNumber가 숫자만 포함된 문자열이라고 가정)
            String cleanedPhoneNumber = phoneNumber.replace("-", "");
            int userId = Integer.parseInt(cleanedPhoneNumber);

            Point newPoint = new Point();
            newPoint.setUserId(userId);  // userId를 int로 설정
            newPoint.setPoint(point);
            pointMapper.insertPoint(newPoint);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid phone number format: must be numeric.");
        }
    }

    // 포인트 차감 메서드
    public void update(String phoneNumber, int point) {
        try {
            String cleanedPhoneNumber = phoneNumber.replace("-", "");
            int userId = Integer.parseInt(cleanedPhoneNumber);

            Point updatePoint = new Point();
            updatePoint.setUserId(userId);  // userId를 int로 설정
            updatePoint.setPoint(point);
            pointMapper.updatePoint(updatePoint);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid phone number format: must be numeric.");
        }
    }

    // 핸드폰 번호로 유저 조회
    public Point findByPhoneNumber(String phoneNumber) {
        try {
            // phoneNumber를 int로 변환하여 조회
            String cleanedPhoneNumber = phoneNumber.replace("-", "");
            int userId = Integer.parseInt(cleanedPhoneNumber);
            return pointMapper.findPointByPhoneNumber(userId);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid phone number format: must be numeric.");
        }
    }

    // 새로운 유저 생성 (user_tb에 저장)
    public void createNewUser(String phoneNumber) {
        try {
            // phoneNumber에서 하이픈을 제거한 후 저장
            String cleanedPhoneNumber = phoneNumber.replace("-", "");
            pointMapper.createNewUser(cleanedPhoneNumber); // phoneNumber를 그대로 사용하여 유저 생성
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid phone number format: must be numeric.");
        }
    }
}