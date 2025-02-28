package com.kamilglazer.task.controller;


import com.kamilglazer.task.service.KeywordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/keywords")
@RequiredArgsConstructor
@CrossOrigin("*")
public class KeywordController {

    private final KeywordService keywordService;

    @GetMapping
    public ResponseEntity<List<String>> getKeywords(@RequestParam String query) {
        return ResponseEntity.ok(keywordService.findByWordContainingIgnoreCase(query));
    }

}
