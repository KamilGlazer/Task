package com.kamilglazer.task.repository;

import com.kamilglazer.task.entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
}
