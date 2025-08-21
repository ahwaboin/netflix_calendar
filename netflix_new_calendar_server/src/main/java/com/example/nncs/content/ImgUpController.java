package com.example.nncs.content;

import java.io.File;
import java.io.IOException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class ImgUpController {

    @PostMapping("/imgUp")
    public void handleFileUpload(@RequestParam("image") MultipartFile file) {

        try {
            // 파일 저장 경로 설정
            String uploadDir = "C:\\dev\\portfolio\\netflix_calendar\\"+
                "netflix_new_calendar_server\\src\\main\\resources\\static\\imgs\\";
            log.info("업로드 디렉토리: " + uploadDir);
            String originalFilename = file.getOriginalFilename();
            // String filePath = uploadDir + System.currentTimeMillis() + "_" + originalFilename;
            String filePath = uploadDir + originalFilename;
            log.info(originalFilename + " 파일 업로드 시작");

            // 디렉토리 생성 (존재하지 않는 경우)
            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) {
                uploadDirFile.mkdirs();
            }

            // 파일 저장
            File dest = new File(filePath);
            file.transferTo(dest);


        } catch (IOException e) {
            // 예외 처리
            e.printStackTrace();

        }
    }
    
}
