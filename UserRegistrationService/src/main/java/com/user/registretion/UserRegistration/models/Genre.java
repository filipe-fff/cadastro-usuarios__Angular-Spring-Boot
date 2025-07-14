package com.user.registretion.UserRegistration.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "genres")
@Data
@ToString
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private byte id;

    @Column(name = "description", nullable = false)
    private String description;
}