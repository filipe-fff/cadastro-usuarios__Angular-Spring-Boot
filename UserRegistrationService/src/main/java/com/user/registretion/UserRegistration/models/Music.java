package com.user.registretion.UserRegistration.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @Id
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
}
