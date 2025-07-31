package com.user.registretion.UserRegistration.DTOs;

import java.util.UUID;

public record DependentDTO(
        UUID id,
        String name,
        Byte age,
        Long document
        ) {
}