package com.korit.mcdonaldkiosk.service.admin;

import com.korit.mcdonaldkiosk.entity.MenuInfo;
import com.korit.mcdonaldkiosk.repository.admin.AdminMenuInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminMenuInfoService {
    @Autowired
    private AdminMenuInfoRepository adminMenuInfoRepository;

    // 메뉴 영양 정보 다건 조회
    public List<MenuInfo> getMenuInfoListByMenuId(int menuId) {
        return adminMenuInfoRepository.getMenuInfoListByMenuId(menuId);
    }
}
