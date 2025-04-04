package com.korit.mcdonaldkiosk.mapper;

import com.korit.mcdonaldkiosk.entity.MenuInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminMenuInfoMapper {
    // 메뉴 영양 정보 및 원산지 단건 조회
    List<MenuInfo> getMenuInfoListByMenuId(int menuId);
    // 메뉴 영양 정보 및 원산지 수정
    int updateMenuInfoByMenuId(MenuInfo menuInfo);
    // 메뉴 영양 정보 및 원산지 추가
//    int addMenuInfo(MenuInfo menuInfo);
}
