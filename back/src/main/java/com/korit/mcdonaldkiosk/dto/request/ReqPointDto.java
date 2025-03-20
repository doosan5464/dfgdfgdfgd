package com.korit.mcdonaldkiosk.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReqPointDto {
    private String phoneNumber;
    private int calcul;
    private int point;
}
