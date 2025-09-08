package com.user.registretion.UserRegistration.dtos.update;

import java.util.UUID;

public record MusicUpdateDTO(
        UUID id,
        String title,
        String band,
        Byte genre,
        Boolean isFavorite
    ) {
}