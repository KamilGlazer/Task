package com.kamilglazer.task.controller;


import com.kamilglazer.task.dto.CampaignDto;
import com.kamilglazer.task.service.CampaignService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campaign")
@RequiredArgsConstructor
public class CampaignController {

    private final CampaignService campaignService;

    @GetMapping
    public ResponseEntity<List<CampaignDto>> getCampaigns() {
        return ResponseEntity.ok(campaignService.findAll());
    }

    @GetMapping("/{campaignId}")
    public ResponseEntity<CampaignDto> getCampaign(@PathVariable Long campaignId) {
        return ResponseEntity.ok(campaignService.findByCampaignId(campaignId));
    }

    @PostMapping
    public ResponseEntity<CampaignDto> createCampaign(@RequestBody CampaignDto campaignDto) {
        return ResponseEntity.ok(campaignService.create(campaignDto));
    }

    @PutMapping("/{campaignId}")
    public ResponseEntity<CampaignDto> updateCampaign(@RequestBody CampaignDto campaignDto, @PathVariable Long campaignId) {
        return ResponseEntity.ok(campaignService.update(campaignDto, campaignId));
    }

    @DeleteMapping("/{campaignId}")
    public ResponseEntity<Void> deleteCampaign(@PathVariable Long campaignId) {
        campaignService.delete(campaignId);
        return ResponseEntity.noContent().build();
    }

}
