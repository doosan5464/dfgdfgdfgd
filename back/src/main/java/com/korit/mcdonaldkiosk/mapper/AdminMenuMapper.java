package com.korit.mcdonaldkiosk.mapper;

import com.korit.mcdonaldkiosk.entity.Menu;
import com.korit.mcdonaldkiosk.entity.MenuPrice;
import com.korit.mcdonaldkiosk.entity.MenuWithAllInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AdminMenuMapper {
    MenuWithAllInfo selectAllInfoMenuById(int menuId);
    List<Menu> selectAllCategories();
    int updateIsExposureByClick(
            @Param("menuId") int menuId,
            @Param("isExposure") int isExposure);

    List<Menu> selectAllMenus();
    Menu selectMenuById(int menuId);
    List<MenuPrice> getMenuPrices(int menuId);
    int insertMenu(Menu menu);
    int insertMenuPrices(@Param("menuId") int menuId, @Param("menuPrices") List<MenuPrice> menuPrices);
    int deleteMenuPrices(int menuId);
    int deleteMenu(int menuId);
    List<Menu> selectAllMenuImages();



}
