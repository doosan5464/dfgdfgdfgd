package com.korit.mcdonaldkiosk.controller.admin;

import com.korit.mcdonaldkiosk.dto.request.ReqAdminMenuInfoDto;
import com.korit.mcdonaldkiosk.entity.MenuInfo;
import com.korit.mcdonaldkiosk.service.admin.AdminMenuInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/admin")
public class AdminMenuInfoController {
    @Autowired
    private AdminMenuInfoService adminMenuInfoService;

    // 메뉴 영양 정보 및 원산지 다건 조회
    @GetMapping("/menuInfo/{menuId}")
    public ResponseEntity<?> getMenuInfoListByMenuId(@PathVariable int menuId) {
        return ResponseEntity.ok(adminMenuInfoService.getMenuInfoListByMenuId(menuId));
    }

    // 메뉴 영양 정보 및 원산지 수정
    @PutMapping("/menuInfo")
    public ResponseEntity<?> updateMenuInfo(@RequestBody ReqAdminMenuInfoDto reqDto) {
        int result = adminMenuInfoService.updateMenuInfo(reqDto);
        if (result > 0) {
            return ResponseEntity.ok("수정 완료");
        } else {
            return ResponseEntity.badRequest().body("수정 실패");
        }
    }
}
