package com.kamilglazer.task.dto;

import com.kamilglazer.task.domain.CAMPAIGN_STATUS;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class CampaignDto {
    private Long id;
    private String name;
    private List<String> keywords;
    private BigDecimal bidAmount;
    private BigDecimal campaignFund;
    private CAMPAIGN_STATUS campaignStatus;
    private String town;
    private int radius;
    private Long emeraldAccountId;
}
