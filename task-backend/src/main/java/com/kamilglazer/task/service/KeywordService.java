package com.kamilglazer.task.service;

import java.util.List;

public interface KeywordService {
    List<String> findByWordContainingIgnoreCase(String query);
}
