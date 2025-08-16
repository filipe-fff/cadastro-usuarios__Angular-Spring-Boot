package com.user.registretion.UserRegistration.DTOs.save;

public record MusicSaveDTO(
        String title,
        String band,
        Byte genre,
        Boolean isFavorite
    ) {
}