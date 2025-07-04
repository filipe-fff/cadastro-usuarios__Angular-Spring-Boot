package com.user.registretion.UserRegistration.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "musics")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Music {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "band", nullable = false)
    private String band;

    @Column(name = "genre", nullable = false)
    private Byte genre;

    @Column(name = "is_favorite")
    private Boolean isFavorite;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
}
