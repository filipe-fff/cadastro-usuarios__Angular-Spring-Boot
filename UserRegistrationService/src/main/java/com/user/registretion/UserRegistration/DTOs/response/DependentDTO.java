package com.user.registretion.UserRegistration.DTOs.response;

import java.util.UUID;

public record DependentDTO(
        UUID id,
        String name,
        Byte age,
        Long document
    ) {
}