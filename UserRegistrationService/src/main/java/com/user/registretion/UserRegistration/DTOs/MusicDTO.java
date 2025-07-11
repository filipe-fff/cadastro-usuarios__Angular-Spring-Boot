package com.user.registretion.UserRegistration.DTOs;

public record MusicDTO(
        String title,
        String band,
        Byte genre,
        Boolean isFavorite
        ) {
}