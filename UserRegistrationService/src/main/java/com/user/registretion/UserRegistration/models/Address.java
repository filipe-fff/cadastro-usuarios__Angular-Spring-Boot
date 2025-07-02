package com.user.registretion.UserRegistration.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "address")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "type", nullable = false)
    private Byte type;

    @Column(name = "street", nullable = false)
    private String Street;

    @Column(name = "complement", nullable = false)
    private String complement;

    @Column(name = "country", nullable = false)
    private String country;

    @Column(name = "state", nullable = false)
    private String state;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "user_id", columnDefinition = "BINARY(16)")
    private UUID userId;
}