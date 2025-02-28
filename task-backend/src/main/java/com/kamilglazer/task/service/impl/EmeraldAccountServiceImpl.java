package com.kamilglazer.task.service.impl;

import com.kamilglazer.task.dto.EmeraldAccountDto;
import com.kamilglazer.task.entity.EmeraldAccount;
import com.kamilglazer.task.exception.EmeraldAccountException;
import com.kamilglazer.task.repository.EmeraldAccountRepository;
import com.kamilglazer.task.service.EmeraldAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmeraldAccountServiceImpl implements EmeraldAccountService {

    private final EmeraldAccountRepository emeraldAccountRepository;

    @Override
    public EmeraldAccountDto getAccount(Long accountId) {
        EmeraldAccount emeraldAccount = emeraldAccountRepository.findById(accountId).orElseThrow(()-> new EmeraldAccountException("Account not found"));
        return EmeraldAccountDto.builder()
                .ownerName(emeraldAccount.getOwnerName())
                .balance(emeraldAccount.getBalance())
                .build();
    }
}
