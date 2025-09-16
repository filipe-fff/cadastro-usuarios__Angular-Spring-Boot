package com.user.registretion.UserRegistration.dtos.user.update.dto;

import java.util.UUID;

public record MusicUpdateDTO(
        UUID id,
        String title,
        String band,
        Byte genre,
        Boolean isFavorite
    ) {
}