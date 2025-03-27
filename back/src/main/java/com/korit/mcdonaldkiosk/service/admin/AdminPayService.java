package com.korit.mcdonaldkiosk.service.admin;

import com.korit.mcdonaldkiosk.entity.PayList;
import com.korit.mcdonaldkiosk.repository.admin.AdminPayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminPayService {
    @Autowired
    AdminPayRepository adminPayRepository;

    public List<PayList> getPayListByDate (String date) {
        return adminPayRepository.findPayListByDate(date).orElse(null);
    }
}
