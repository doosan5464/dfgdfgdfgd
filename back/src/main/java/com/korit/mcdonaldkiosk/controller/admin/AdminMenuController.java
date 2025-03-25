package com.korit.mcdonaldkiosk.controller.admin;

import com.korit.mcdonaldkiosk.dto.request.ReqExposureDto;
import com.korit.mcdonaldkiosk.entity.Menu;
import com.korit.mcdonaldkiosk.entity.MenuPrice;
import com.korit.mcdonaldkiosk.entity.MenuWithAllInfo;
import com.korit.mcdonaldkiosk.service.admin.AdminMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminMenuController {

    @Autowired
    private AdminMenuService adminMenuService;

    // 메뉴의 모든 정보를 조회하는 API
    @GetMapping("/menuinfo")
    public ResponseEntity<MenuWithAllInfo> getAllInfoMenu(@ModelAttribute ReqExposureDto dto) {
        System.out.println(adminMenuService.getAllInfoMenuList(dto.getMenuId()));
        return ResponseEntity.ok().body(adminMenuService.getAllInfoMenuList(dto.getMenuId()));
    }

    // 카테고리 목록을 조회하는 API
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        List<Menu> allCategories = adminMenuService.getAllCategories();
        //객체에서 카테고리 값만 빼온다.
        List<String> categories = allCategories
                .stream()
                .map(Menu::getMenuCategory)
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(categories);
    }

    // 메뉴 노출 여부 변경 API
    // 프론트랑 연결이 원할하지 않을경우 Map이 아니라 dto 만들어서 값 받기
    @PutMapping("/isExposure")
    public ResponseEntity<?> changeExposure(
            @RequestBody ReqExposureDto request
    ) {
        //받은값 int로 변환
        int menuId = request.getMenuId();
        int isExposure = request.getIsExposure();
        adminMenuService.changeIsExposure(menuId, isExposure);
        return ResponseEntity.ok().build();
    }

    // 모든 메뉴 조회
    @GetMapping("/menus")
    public ResponseEntity<?> getAllMenus() {
        return ResponseEntity.ok().body(adminMenuService.getAllMenus());
    }


    // 특정 메뉴의 가격 정보 조회
    @GetMapping("/menus/{menuId}")
    public ResponseEntity<?> getMenuDetail(@PathVariable int menuId) {
        Menu menu = adminMenuService.getMenuById(menuId);
        return ResponseEntity.ok().body(menu);
    }


    // 메뉴 추가 (가격 포함)
    @PostMapping("/menus")
    public void addMenu(@RequestBody Menu menu, @RequestParam List<MenuPrice> prices) {
        adminMenuService.addMenu(menu, prices);
    }

    // 메뉴 삭제
    @DeleteMapping("/menus/{menuId}")
    public void deleteMenu(@PathVariable int menuId) {
        adminMenuService.deleteMenu(menuId);
    }



}

