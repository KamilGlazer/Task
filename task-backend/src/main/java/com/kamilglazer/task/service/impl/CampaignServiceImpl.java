package com.kamilglazer.task.service.impl;

import com.kamilglazer.task.dto.CampaignDto;
import com.kamilglazer.task.entity.Campaign;
import com.kamilglazer.task.entity.EmeraldAccount;
import com.kamilglazer.task.entity.Keyword;
import com.kamilglazer.task.exception.CampaignNotFoundException;
import com.kamilglazer.task.exception.EmeraldAccountException;
import com.kamilglazer.task.mapper.CampaignMapper;
import com.kamilglazer.task.repository.CampaignRepository;
import com.kamilglazer.task.repository.EmeraldAccountRepository;
import com.kamilglazer.task.repository.KeywordRepository;
import com.kamilglazer.task.service.CampaignService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CampaignServiceImpl implements CampaignService {

    private final CampaignRepository campaignRepository;
    private final EmeraldAccountRepository emeraldAccountRepository;
    private final KeywordRepository keywordRepository;

    @Override
    public CampaignDto findByCampaignId(Long id) {
        Campaign campaign = campaignRepository.findById(id).orElseThrow(() -> new CampaignNotFoundException("Campaign not found"));
        return CampaignMapper.toDto(campaign);
    }

    @Override
    public CampaignDto create(CampaignDto campaignDto) {
        EmeraldAccount account = emeraldAccountRepository.findById(campaignDto.getEmeraldAccountId()).orElseThrow(() -> new EmeraldAccountException("Emerald Account not found"));
        BigDecimal campaignFund = campaignDto.getCampaignFund();

        if(account.getBalance().compareTo(campaignFund) < 0) {
            throw new EmeraldAccountException("Not enough funds in the Emerald account");
        }

        account.setBalance(account.getBalance().subtract(campaignFund));
        emeraldAccountRepository.save(account);

        List<Keyword> allKeywords = getOrCreateKeywords(campaignDto.getKeywords());
        Campaign campaign = CampaignMapper.toEntity(campaignDto,account,allKeywords);
        Campaign campaignSaved = campaignRepository.save(campaign);
        return CampaignMapper.toDto(campaignSaved);
    }

    @Override
    public void delete(Long campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId).orElseThrow(() -> new CampaignNotFoundException("Campaign not found"));
        EmeraldAccount account = campaign.getEmeraldAccount();
        account.setBalance(account.getBalance().add(campaign.getCampaignFund()));
        emeraldAccountRepository.save(account);
        campaignRepository.delete(campaign);
    }

    @Override
    public CampaignDto update(CampaignDto campaignDto,Long campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId).orElseThrow(() -> new CampaignNotFoundException("Campaign not found"));
        EmeraldAccount account = emeraldAccountRepository.findById(campaignDto.getEmeraldAccountId()).orElseThrow(() -> new EmeraldAccountException("Emerald Account not found"));

        BigDecimal currentFund = campaign.getCampaignFund();
        BigDecimal newFund = campaignDto.getCampaignFund();

        if(newFund.compareTo(currentFund) > 0) {
            BigDecimal additionalRequired = newFund.subtract(currentFund);
            if(account.getBalance().compareTo(additionalRequired) < 0) {
                throw new EmeraldAccountException("Not enough funds in the Emerald account");
            }
            account.setBalance(account.getBalance().subtract(additionalRequired));
        }else{
            account.setBalance(account.getBalance().add(currentFund.subtract(newFund)));
        }
        emeraldAccountRepository.save(account);

        List<Keyword> allKeywords = getOrCreateKeywords(campaignDto.getKeywords());

        campaign.setName(campaignDto.getName());
        campaign.setCampaignFund(campaignDto.getCampaignFund());
        campaign.setCampaignStatus(campaignDto.getCampaignStatus());
        campaign.setTown(campaignDto.getTown());
        campaign.setBidAmount(campaignDto.getBidAmount());
        campaign.setKeywords(allKeywords);
        campaign.setRadius(campaignDto.getRadius());
        Campaign updatedCampaign = campaignRepository.save(campaign);
        return CampaignMapper.toDto(updatedCampaign);
    }

    @Override
    public List<CampaignDto> findAll() {
        List<Campaign> campaigns = campaignRepository.findAll();
        return campaigns.stream().map(CampaignMapper::toDto).collect(Collectors.toList());
    }


    private List<Keyword> getOrCreateKeywords(List<String> keywordWords) {
        List<Keyword> existingKeywords = keywordRepository.findByWordIn(keywordWords);
        List<String> existingKeywordWords = existingKeywords.stream()
                .map(Keyword::getWord)
                .toList();

        List<Keyword> newKeywords = keywordWords.stream()
                .filter(word -> !existingKeywordWords.contains(word))
                .map(word -> Keyword.builder().word(word).build())
                .toList();

        keywordRepository.saveAll(newKeywords);
        List<Keyword> allKeywords = new ArrayList<>(existingKeywords);
        allKeywords.addAll(newKeywords);
        return allKeywords;
    }


}
