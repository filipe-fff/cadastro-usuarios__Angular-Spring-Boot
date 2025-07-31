package com.user.registretion.UserRegistration.DTOs;

import java.util.UUID;

public record MusicDTO(
        UUID id,
        String title,
        String band,
        Byte genre,
        Boolean isFavorite
        ) {
}