package com.korit.mcdonaldkiosk.dto.request;

import lombok.Data;

@Data
public class ReqMenuImageDto {
    private String imageUrl;
    private String menuName;
    private String imageType;
}
