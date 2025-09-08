package com.user.registretion.UserRegistration.dtos.update;

import java.util.UUID;

public record DependentUpdateDTO(
        UUID id,
        String name,
        Byte age,
        Long document
    ) {
}