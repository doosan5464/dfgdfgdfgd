package com.korit.mcdonaldkiosk.service.admin;

import com.korit.mcdonaldkiosk.entity.MenuInfo;
import com.korit.mcdonaldkiosk.repository.admin.AdminMenuInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminMenuInfoService {
    @Autowired
    private AdminMenuInfoRepository adminMenuInfoRepository;

    // 메뉴 영양 정보 및 원산지 단건 조회
    public MenuInfo getMenuInfoById(int menuId) {
        return adminMenuInfoRepository.getMenuInfoById(menuId).orElse(null);
    }
}
