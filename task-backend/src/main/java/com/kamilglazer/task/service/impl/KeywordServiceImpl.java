package com.kamilglazer.task.service.impl;

import com.kamilglazer.task.entity.Keyword;
import com.kamilglazer.task.repository.KeywordRepository;
import com.kamilglazer.task.service.KeywordService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class KeywordServiceImpl implements KeywordService {

    private final KeywordRepository keywordRepository;

    @Override
    public List<String> findByWordContainingIgnoreCase(String query) {
        List<Keyword> keywords = keywordRepository.findByWordContainingIgnoreCase(query);
        return keywords.stream()
                .map(Keyword::getWord)
                .collect(Collectors.toList());
    }


}
