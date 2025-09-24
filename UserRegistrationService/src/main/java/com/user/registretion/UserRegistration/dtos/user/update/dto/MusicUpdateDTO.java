package com.user.registretion.UserRegistration.dtos.user.update.dto;

import com.user.registretion.UserRegistration.models.Music;
import com.user.registretion.UserRegistration.models.User;

import java.util.*;
import java.util.stream.Collectors;

public record MusicUpdateDTO(
        UUID id,
        String title,
        String band,
        Byte genre,
        Boolean isFavorite
    ) {

    public static void toMusic(User user, MusicUpdateDTO musicUpdateDTO, Map<UUID, Music> musicsMap) {
        Music music;
        if (musicUpdateDTO.id() != null && musicsMap.containsKey(musicUpdateDTO.id()))
            music = musicsMap.get(musicUpdateDTO.id());

        else music = new Music();

        music.setTitle(musicUpdateDTO.title());
        music.setBand(musicUpdateDTO.band());
        music.setGenre(musicUpdateDTO.genre());
        music.setIsFavorite(musicUpdateDTO.isFavorite());
        music.setUser(user);

        user.getMusics().add(music);
    }

    public static void toMusicsList(User user, List<MusicUpdateDTO> musicUpdateListDTO) {
        ArrayList<Music> mutableMusicsList = new ArrayList<>(user.getMusics());
        Map<UUID, Music> musicsMap = mutableMusicsList
                .stream()
                .collect(Collectors.toMap(
                        Music::getId,
                        music -> music,
                        (existing, replacement) -> existing,
                        LinkedHashMap::new
                ));

        user.getMusics().removeIf(m ->
                musicUpdateListDTO
                        .stream()
                        .noneMatch(dto -> dto.id() != null && dto.id().equals(m.getId()))
        );

        musicUpdateListDTO
                .forEach(m -> MusicUpdateDTO.toMusic(user, m, musicsMap));
    }
}