package com.user.registretion.UserRegistration.dtos.response;

import java.util.UUID;

public record MusicDTO(
        UUID id,
        String title,
        String band,
        Byte genre,
        Boolean isFavorite
    ) {
}