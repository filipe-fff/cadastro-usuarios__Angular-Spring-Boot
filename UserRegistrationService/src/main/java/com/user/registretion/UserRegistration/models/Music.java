package com.user.registretion.UserRegistration.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.user.registretion.UserRegistration.DTOs.MusicDTO;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "musics")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@ToString(exclude = "user")
public class Music {

    public Music(User user, MusicDTO musicDTO) {
        this.prepareMusic(user, musicDTO);
    }

    public Music(UUID id, User user, MusicDTO musicDTO) {
        this.prepareMusic(user, musicDTO);
        this.setId(id);
    }

    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, columnDefinition = "BINARY(16)")
    private UUID id;

    @NonNull
    @Column(name = "title", nullable = false)
    private String title;

    @NonNull
    @Column(name = "band", nullable = false)
    private String band;

    @NonNull
    @Column(name = "genre", nullable = false)
    private Byte genre;

    @NonNull
    @Column(name = "is_favorite", nullable = false)
    private Boolean isFavorite;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    private void prepareMusic(User user, MusicDTO musicDTO) {
        this.setTitle(musicDTO.title());
        this.setBand(musicDTO.band());
        this.setGenre(musicDTO.genre());
        this.setIsFavorite(musicDTO.isFavorite());
        this.setUser(user);
    }
}
