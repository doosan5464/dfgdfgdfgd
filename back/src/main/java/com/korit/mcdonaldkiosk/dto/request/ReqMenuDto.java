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

    private List<PriceDto> prices;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PriceDto {
        private String size;         // "M" or "L"
        private int price;           // 정가
        private Integer discountPrice; // 할인가는 nullable
    }
}
