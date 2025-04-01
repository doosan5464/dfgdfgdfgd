package com.korit.mcdonaldkiosk.mapper;

import com.korit.mcdonaldkiosk.entity.MenuInfo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminMenuInfoMapper {
    // 메뉴 영양 정보 및 원산지 단건 조회
    MenuInfo getMenuInfoById(int menuId);
}
