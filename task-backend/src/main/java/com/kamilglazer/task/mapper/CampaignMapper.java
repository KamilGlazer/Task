package com.kamilglazer.task.mapper;

import com.kamilglazer.task.dto.CampaignDto;
import com.kamilglazer.task.entity.Campaign;
import com.kamilglazer.task.entity.EmeraldAccount;
import com.kamilglazer.task.entity.Keyword;

import java.util.List;
import java.util.stream.Collectors;

public class CampaignMapper {

    public static CampaignDto toDto(Campaign campaign) {
        return CampaignDto.builder()
                .id(campaign.getId())
                .name(campaign.getName())
                .keywords(campaign.getKeywords().stream()
                        .map(Keyword::getWord)
                        .collect(Collectors.toList()))
                .bidAmount(campaign.getBidAmount())
                .campaignFund(campaign.getCampaignFund())
                .campaignStatus(campaign.getCampaignStatus())
                .town(campaign.getTown())
                .radius(campaign.getRadius())
                .emeraldAccountId(campaign.getEmeraldAccount().getId())
                .build();
    }

    public static Campaign toEntity(CampaignDto campaignDto, EmeraldAccount account, List<Keyword> keywords) {
        return Campaign.builder()
                .name(campaignDto.getName())
                .keywords(keywords)
                .bidAmount(campaignDto.getBidAmount())
                .campaignFund(campaignDto.getCampaignFund())
                .campaignStatus(campaignDto.getCampaignStatus())
                .town(campaignDto.getTown())
                .radius(campaignDto.getRadius())
                .emeraldAccount(account)
                .build();
    }

}
