package com.korit.mcdonaldkiosk.service.admin;

import com.korit.mcdonaldkiosk.entity.Admin;
import com.korit.mcdonaldkiosk.repository.admin.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Transactional(rollbackFor = Exception.class)
    public void updatePassword(Admin admin, String password) {
        String encodedPassword = passwordEncoder.encode(password);
        adminRepository.updatePassword(admin.getAdminId(), encodedPassword);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateNickname(Admin admin, String tradeName) {
        adminRepository.updateTradeName(admin.getAdminId(), tradeName);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateEmail(Admin admin, String email) {
        adminRepository.updateEmail(admin.getAdminId(), email);
    }
}

