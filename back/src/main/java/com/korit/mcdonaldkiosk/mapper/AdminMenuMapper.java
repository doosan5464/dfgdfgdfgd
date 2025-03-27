package com.korit.mcdonaldkiosk.mapper;

import com.korit.mcdonaldkiosk.entity.Menu;
import com.korit.mcdonaldkiosk.entity.MenuPrice;
import com.korit.mcdonaldkiosk.entity.MenuWithAllInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AdminMenuMapper {
    // 메뉴 상세 정보 조회
    MenuWithAllInfo selectAllInfoMenuById(int menuId);

    // 모든 카테고리 조회
    List<Menu> selectAllCategories();

    // 노출 여부 업데이트
    int updateIsExposureByClick(
            @Param("menuId") int menuId,
            @Param("isExposure") int isExposure);

    // 전체 메뉴 조회
    List<Menu> selectAllMenus();
    // 단일 메뉴 조회
    Menu selectMenuById(int menuId);
    // 해당 메뉴의 가격 리스트 조회
    List<MenuPrice> getMenuPrices(int menuId);
    // 메뉴 등록
    int insertMenu(Menu menu);
    // 가격 등록
    int insertMenuPrices(@Param("menuId") int menuId, @Param("menuPrices") List<MenuPrice> menuPrices);
    // 기존 가격 삭제
    int deleteMenuPrices(int menuId);
    // 메뉴 삭제
    int deleteMenu(int menuId);
    // 이미지 모달용 메뉴 이미지 불러오기
    List<Menu> selectAllMenuImages();
    // 메뉴 수정
    int updateMenu(Menu menu);



}
