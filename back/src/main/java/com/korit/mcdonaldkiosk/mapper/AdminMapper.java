package com.korit.mcdonaldkiosk.mapper;

import com.korit.mcdonaldkiosk.entity.Admin;
import com.korit.mcdonaldkiosk.entity.OAuth2;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminMapper {
    Admin selectByAdminName(String adminName);
    Admin selectByAdminId(int adminId);
    Admin findAdminByOAuth2name(String oauth2name);

    int insertAdmin(Admin admin);


    int saveOAuth2(OAuth2 oAuth2);


}
