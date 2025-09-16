package com.user.registretion.UserRegistration.dtos.user.update.dto;

import java.util.UUID;

public record DependentUpdateDTO(
        UUID id,
        String name,
        Byte age,
        Long document
    ) {
}