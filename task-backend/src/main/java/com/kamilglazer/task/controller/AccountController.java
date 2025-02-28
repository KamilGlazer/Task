package com.kamilglazer.task.controller;

import com.kamilglazer.task.dto.EmeraldAccountDto;
import com.kamilglazer.task.service.EmeraldAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/account")
@CrossOrigin("*")
public class AccountController {

    private final EmeraldAccountService accountService;

    @GetMapping("/{id}")
    public ResponseEntity<EmeraldAccountDto> getAccount(@PathVariable Long id) {
        return ResponseEntity.ok(accountService.getAccount(id));
    }

}
