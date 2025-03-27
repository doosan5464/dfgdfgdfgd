package com.korit.mcdonaldkiosk.mapper;

import com.korit.mcdonaldkiosk.entity.PayList;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminPayMapper {
    List<PayList> selectPayListByDate(String time);
}
