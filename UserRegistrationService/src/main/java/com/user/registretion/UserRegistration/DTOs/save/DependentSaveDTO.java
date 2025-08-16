package com.user.registretion.UserRegistration.DTOs.save;

public record DependentSaveDTO(
        String name,
        Byte age,
        Long document
    ) {
}