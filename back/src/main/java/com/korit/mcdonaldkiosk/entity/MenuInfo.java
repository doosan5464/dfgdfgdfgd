package com.korit.mcdonaldkiosk.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuInfo {
    private int menuInfoId;
    private int menuId;
    private String size;
    private int weight;
    private int volume;
    private int calories;
    private int sugars;
    private int protein;
    private int saturatedFat;
    private int sodium;
    private int caffeine;
    private String menuOrigin;
}
