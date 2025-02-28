package com.kamilglazer.task.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;


@Data
@Builder
public class EmeraldAccountDto {
    private String ownerName;
    private BigDecimal balance;
}
