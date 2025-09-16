package com.user.registretion.UserRegistration.dtos.user.response.dto;

import com.user.registretion.UserRegistration.models.Music;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public record MusicDTO(
        UUID id,
        String title,
        String band,
        Byte genre,
        Boolean isFavorite
    ) {

    public static MusicDTO toMusicDTO(Music music) {
        return new MusicDTO(
                music.getId(),
                music.getTitle(),
                music.getBand(),
                music.getGenre(),
                music.getIsFavorite()
        );
    }

    public static List<MusicDTO> toMusicsListDTO(List<Music> musicsList) {
        return musicsList
                .stream()
                .map(MusicDTO::toMusicDTO)
                .collect(Collectors.toCollection(ArrayList::new));
    }
}