package com.korit.mcdonaldkiosk.controller.admin;

import com.korit.mcdonaldkiosk.entity.MenuInfo;
import com.korit.mcdonaldkiosk.service.admin.AdminMenuInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("api/admin")
public class AdminMenuInfoController {
    @Autowired
    private AdminMenuInfoService adminMenuInfoService;

    // 메뉴 영양 정보 및 원산지 단건 조회
    @GetMapping("/menuInfo/{menuId}")
    public ResponseEntity<?> getMenuInfoByMenuId(@PathVariable int menuId) {
        MenuInfo menuInfo = adminMenuInfoService.getMenuInfoById(menuId);
        if (menuInfo != null) {
            return ResponseEntity.ok(menuInfo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
