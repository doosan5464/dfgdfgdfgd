package com.korit.mcdonaldkiosk.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MenuWithAllInfo {
    private int menuId;
    private String menuName;
    private String menuCategory;
    private int menuSequence;
    private String singleImg;
    private int isExposure;

    private int menuPrice;

    private String size;
    private int weightG;
    private int volumeMl;
    private int calories;
    private int sugars;
    private int protein;
    private int saturatedFat;
    private int sodium;
    private int caffeine;
    private String menuOrigin;
}
