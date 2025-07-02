package com.user.registretion.UserRegistration.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "dependents")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Dependent {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "age", nullable = false)
    private Byte age;

    @Column(name = "document", nullable = false)
    private String document;

    @Column(name = "user_id", columnDefinition = "BINARY(16)")
    private UUID userId;
}