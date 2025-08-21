package com.example.nncs.content;

import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("*")
public interface ContentRepo extends CrudRepository<Content, Long> {
    //기본 CRUD 메소드들은 CrudRepository에서 제공됨
    //추가적인 쿼리 메소드를 정의할 수 있음
}
