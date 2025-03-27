package com.korit.mcdonaldkiosk.controller.admin;

import com.korit.mcdonaldkiosk.dto.request.ReqPayListDto;
import com.korit.mcdonaldkiosk.entity.PayList;
import com.korit.mcdonaldkiosk.service.admin.AdminPayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/pay")
public class AdminPayController {
    @Autowired
    private AdminPayService adminPayService;

    @GetMapping("/paylist")
    public ResponseEntity<?> getPayList(@ModelAttribute ReqPayListDto dto) {
        //Date형식 String으로 변환

        //DB데이터 postone으로 전달하기 보류.
        //date 타입을 받아서 string 전환하는데 난항.

        String[] datePatterns = { //date형식에 따른 대응
                "yyyy",
                "yyyy-MM",
                "yyyy-MM-dd",
                "yyyy-MM-dd'T'HH:mm:ss"
        };

        Date parseDate = null;

        for (String pattern : datePatterns) {
            SimpleDateFormat sdf = new SimpleDateFormat(pattern);
//            try {
//                parseDate = sdf.parse(dto.getSelctDate());
//                break;
//            } catch (ParseException e) {
//                continue;
//            }
        }

        if(parseDate == null) {
            return ResponseEntity.badRequest().body("Invalid date format");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String timeStr = sdf.format(parseDate);

        System.out.println(adminPayService.getPayListByDate(timeStr));
        return ResponseEntity.ok().body(adminPayService.getPayListByDate(timeStr));
    }
}
