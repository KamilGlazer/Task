package com.kamilglazer.task.entity;


import com.kamilglazer.task.domain.CAMPAIGN_STATUS;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToMany
    @JoinTable(
            name = "campaign_keywords",
            joinColumns = @JoinColumn(name = "campaign_id"),
            inverseJoinColumns = @JoinColumn(name = "keyword_id")
    )
    private List<Keyword> keywords;

    @Column(nullable = false)
    @Min(1)
    private BigDecimal bidAmount;

    @Column(nullable = false)
    private BigDecimal campaignFund;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CAMPAIGN_STATUS campaignStatus;

    @Column(nullable = false)
    private String town;

    @Column(nullable = false)
    private int radius;

    @ManyToOne
    @JoinColumn(name = "emerald_account_id",nullable = false)
    private EmeraldAccount emeraldAccount;
}
