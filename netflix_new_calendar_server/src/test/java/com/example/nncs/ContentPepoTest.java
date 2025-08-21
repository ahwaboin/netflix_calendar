package com.example.nncs;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.nncs.content.Content;
import com.example.nncs.content.ContentRepo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootTest
public class ContentPepoTest {
    @Autowired
    private ContentRepo contentRepo;


    @Test
    public void testContentRepo() {
        //테스트 데이터 3개 삽입
        contentRepo.save(
            getContent(
                "Title1", "./img/pm.jpg", "Category1", 
                "SubCategory1", "2025-08-01"));
        contentRepo.save(
            getContent(
                "Title2", "./img/pm.jpg", "Category2", 
                "SubCategory2", "2025-08-01"));
        contentRepo.save(
            getContent(
                "Title3", "./img/pm.jpg", "Category3", 
                "SubCategory3", "2025-08-02"));

        for(Content content : contentRepo.findAll()) {
            log.info("Content: " + content);
        }
    }

    public Content getContent(String title, String image, String firstCategory, String secondCategory, String releaseDate) {
        Content content = new Content();
        content.setTitle(title);
        content.setImage(image);
        content.setFirstCategory(firstCategory);
        content.setSecondCategory(secondCategory);
        content.setReleaseDate(releaseDate);
        return content;
    }
    
}
