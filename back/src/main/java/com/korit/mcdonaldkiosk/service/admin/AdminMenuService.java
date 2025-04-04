package com.korit.mcdonaldkiosk.service.admin;

import com.korit.mcdonaldkiosk.entity.Menu;
import com.korit.mcdonaldkiosk.entity.MenuPrice;
import com.korit.mcdonaldkiosk.entity.MenuWithAllInfo;
import com.korit.mcdonaldkiosk.repository.admin.AdminMenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminMenuService {

    @Autowired
    private AdminMenuRepository adminMenuRepository;

    // 메뉴의 모든 정보를 조회하는 메서드
    public List<MenuWithAllInfo> getAllInfoMenuList(int menuId) {
        return adminMenuRepository.findAllInfoMenuById(menuId).orElse(null);
    }

    // 모든 카테고리를 조회하는 메서드
    public List<Menu> getAllCategories() {
        return adminMenuRepository.findAllCategories();
    }

    // 노출 여부 메서드
    public void changeIsExposure(int menuId, int isExposure) {
        System.out.println("menuId: " + menuId + " isExposure: " + isExposure);
        adminMenuRepository.updateIsExposure(menuId, isExposure);
    }


//     모든 메뉴 가져오기
    public List<Menu> getAllMenus() {
        return adminMenuRepository.getAllMenus().orElse(List.of());
    }

    // 특정 메뉴 정보 조회
    public Menu getMenuById(int menuId) {
        return adminMenuRepository.getMenuById(menuId).orElse(null);
    }

    // 메뉴 가격 조회
    public List<MenuPrice> getMenuPrices(int menuId) {
        return adminMenuRepository.getMenuPrices(menuId).orElse(List.of());
    }

    // 메뉴 추가
    @Transactional(rollbackFor = Exception.class)
    public boolean addMenu(Menu menu, List<MenuPrice> menuPrices) {
        return adminMenuRepository.addMenu(menu, menuPrices).orElse(false);
    }

    // 메뉴 삭제
    public boolean deleteMenu(int menuId) {
        return adminMenuRepository.deleteMenu(menuId).orElse(false);
    }

    // 메뉴 수정
    public boolean updateMenu(Menu menu, List<MenuPrice> menuPrices) {
        return adminMenuRepository.updateMenu(menu, menuPrices).orElse(false);
    }

    public List<Menu> getAllMenuImages() {
        return adminMenuRepository.getAllMenuImages();
    }
}

