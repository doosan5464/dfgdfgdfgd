package com.korit.mcdonaldkiosk.repository.admin;

import com.korit.mcdonaldkiosk.entity.PayList;
import com.korit.mcdonaldkiosk.mapper.AdminPayMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class AdminPayRepository {
    @Autowired
    private AdminPayMapper adminPayMapper;

    public Optional<List<PayList>> findPayListByDate(String date) {
        return Optional.ofNullable(adminPayMapper.selectPayListByDate(date));
    }

}
