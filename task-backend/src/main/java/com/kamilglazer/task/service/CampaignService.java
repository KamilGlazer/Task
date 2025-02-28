package com.kamilglazer.task.service;

import com.kamilglazer.task.dto.CampaignDto;

import java.util.List;

public interface CampaignService {
    CampaignDto findByCampaignId(Long id);
    CampaignDto create(CampaignDto campaignDto);
    void delete(Long campaignId);
    CampaignDto update(CampaignDto campaignDto,Long campaignId);
    List<CampaignDto> findAll();
}
