package com.korit.mcdonaldkiosk.controller.admin;

import com.korit.mcdonaldkiosk.security.pricipal.PrincipalUser;
import com.korit.mcdonaldkiosk.service.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/user/me")
    public ResponseEntity<?> getLoginUser(@AuthenticationPrincipal PrincipalUser principalUser) {
        return ResponseEntity.ok().body(principalUser.getAdmin());
    }

    @PutMapping("/user/profile/password")
    public ResponseEntity<?> changePassword(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestBody Map<String, String> requestBody
    ) {
        String password = requestBody.get("password");
        adminService.updatePassword(principalUser.getAdmin(), password);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/user/profile/nickname")
    public ResponseEntity<?> changeNickname(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestBody Map<String, String> requestBody
    ) {
        String nickname = requestBody.get("nickname");
        adminService.updateNickname(principalUser.getAdmin(), nickname);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/user/profile/email")
    public ResponseEntity<?> changeEmail(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestBody Map<String, String> requestBody
    ) {
        String email = requestBody.get("email");
        adminService.updateEmail(principalUser.getAdmin(), email);
        return ResponseEntity.ok().build();
    }
}
