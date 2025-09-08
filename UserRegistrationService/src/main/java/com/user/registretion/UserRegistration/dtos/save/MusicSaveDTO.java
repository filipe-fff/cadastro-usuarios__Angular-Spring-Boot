package com.user.registretion.UserRegistration.dtos.save;

public record MusicSaveDTO(
        String title,
        String band,
        Byte genre,
        Boolean isFavorite
    ) {
}