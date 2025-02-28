package com.kamilglazer.task.repository;

import com.kamilglazer.task.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KeywordRepository extends JpaRepository<Keyword, Long> {
    List<Keyword> findByWordContainingIgnoreCase(String query);
    List<Keyword> findByWordIn(List<String> words);
}
