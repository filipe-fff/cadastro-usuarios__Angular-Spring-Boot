package com.user.registretion.UserRegistration.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.user.registretion.UserRegistration.DTOs.DependentDTO;
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

    public Dependent(User user, DependentDTO dependentDTO) {
        this.prepareDependent(user, dependentDTO);
    }

    public Dependent(UUID id, User user, DependentDTO dependentDTO) {
        this.prepareDependent(user, dependentDTO);
        this.setId(id);
    }

    @Id
    @JsonIgnore
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
    @Column(name = "document", nullable = false)
    private Long document;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    public void prepareDependent(User user, DependentDTO dependentDTO) {
        this.setName(dependentDTO.name());
        this.setAge(dependentDTO.age());
        this.setDocument(dependentDTO.document());
        this.setUser(user);
    }
}