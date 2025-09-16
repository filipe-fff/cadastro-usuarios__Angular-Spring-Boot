package com.user.registretion.UserRegistration.dtos.user.save.dto;

import com.user.registretion.UserRegistration.models.Music;
import com.user.registretion.UserRegistration.models.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public record MusicSaveDTO(
        String title,
        String band,
        Byte genre,
        Boolean isFavorite
    ) {

    public static Music toMusic(User user, MusicSaveDTO musicSaveDTO) {
        Music music = new Music(
                musicSaveDTO.title(),
                musicSaveDTO.band(),
                musicSaveDTO.genre(),
                musicSaveDTO.isFavorite()
        );
        music.setUser(user);

        return music;
    }

    public static void toMusicsList(User user, List<MusicSaveDTO> musicSaveListDTO) {
        user.setMusics(musicSaveListDTO
                .stream()
                .map(m -> toMusic(user, m))
                .collect(Collectors.toCollection(ArrayList::new)));
    }
}