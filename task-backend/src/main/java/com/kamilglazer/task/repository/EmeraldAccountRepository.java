package com.kamilglazer.task.repository;

import com.kamilglazer.task.entity.EmeraldAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface EmeraldAccountRepository extends JpaRepository<EmeraldAccount, Long> {
}
