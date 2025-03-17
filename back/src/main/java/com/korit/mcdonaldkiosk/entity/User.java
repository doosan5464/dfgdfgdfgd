package com.korit.mcdonaldkiosk.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    private int userId;
    private int roleId;
    private String roleNameKor;
    private int phoneNumber;
    private int totalPoint;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}
