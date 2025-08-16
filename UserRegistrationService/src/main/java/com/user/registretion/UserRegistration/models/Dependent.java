package com.user.registretion.UserRegistration.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.user.registretion.UserRegistration.DTOs.response.DependentDTO;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "dependents")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@ToString(exclude = "user")
public class Dependent {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, columnDefinition = "BINARY(16)")
    private UUID id;

    @NonNull
    @Column(name = "name", nullable = false)
    private String name;

    @NonNull
    @Column(name = "age", nullable = false)
    private Byte age;

    @NonNull
    @Column(name = "document", nullable = false, unique = true)
    private Long document;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
}