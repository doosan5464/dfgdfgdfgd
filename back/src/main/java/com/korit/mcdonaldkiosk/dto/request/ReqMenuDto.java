package com.korit.mcdonaldkiosk.dto.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqMenuDto {
    private String menuName;
    private String menuCategory;
    private int menuSequence;
    private String singleImg;
    private String setImg;
    private int isExposure;

    private List<ReqMenuPriceDto> prices;

}
