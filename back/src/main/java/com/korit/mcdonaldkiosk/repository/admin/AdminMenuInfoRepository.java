package com.korit.mcdonaldkiosk.repository.admin;

import com.korit.mcdonaldkiosk.entity.MenuInfo;
import com.korit.mcdonaldkiosk.mapper.AdminMenuInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class AdminMenuInfoRepository {
    @Autowired
    private AdminMenuInfoMapper adminMenuInfoMapper;

    // 메뉴 영양 정보 다건 조회
    public List<MenuInfo> getMenuInfoListByMenuId(int menuId) {
        return adminMenuInfoMapper.getMenuInfoListByMenuId(menuId);
    }

    // 메뉴 영양 정보 및 원산지 수정
    public int updateMenuInfo(MenuInfo menuInfo) {
        return adminMenuInfoMapper.updateMenuInfoByMenuId(menuInfo);
    }
}
