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
    public MenuWithAllInfo getAllInfoMenuList(int menuId) {
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


    // 모든 메뉴 가져오기
    public List<Menu> getAllMenus() {
        return adminMenuRepository.getAllMenus().orElse(List.of());
    }

    // 특정 메뉴 정보 조회
    public Menu getMenuById(int menuId) {
        return adminMenuRepository.getMenuById(menuId).orElse(null);
    }

    // 메뉴 추가 (가격 정보 포함)
    @Transactional
    public boolean addMenu(Menu menu, List<MenuPrice> menuPrices) {
        return adminMenuRepository.addMenu(menu, menuPrices).orElse(false);
    }

    // 메뉴 삭제 (menu_tb & menu_price_tb)
    @Transactional
    public boolean deleteMenu(int menuId) {
        return adminMenuRepository.deleteMenu(menuId).orElse(false);
    }


    public List<Menu> getAllMenuImages() {
        return adminMenuRepository.getAllMenuImages();
    }
}


//    public List<String> getAllCategories() {
//        List<Menu> allCategories = adminMenuRepository.findAllCategories();
//        //객체에서 카테고리 값만 빼온다.
//        List<String> categories = allCategories.stream()
//                .map(Menu::getMenuCategory)
//                .collect(Collectors.toList());
//        return categories;
//    }
//
//    // 메뉴 갯수를 페이지에 할당하는 메서드
//    public int getMenuListCountByCategory(String searchCategory) {
//        return adminMenuRepository.findMenuCountAllBySearchCategory(searchCategory);
//    }
//
//    public List<Menu> getMenuListSearchByCategory(ReqMenuListDto reqMenuListDto) {
//      int startIndex = (reqMenuListDto.getPage() - 1) * reqMenuListDto.getLimitCount();
//      return adminMenuRepository.findMenuListByCategory(
//              startIndex,
//              reqMenuListDto.getLimitCount(),
//              reqMenuListDto.getCategory()
//      );
//    }