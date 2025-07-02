package com.user.registretion.UserRegistration.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "phone")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Phone {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "type", nullable = false)
    private Byte type;

    @Column(name = "area_code", nullable = false)
    private String areaCode;

    @Column(name = "international_code", nullable = false)
    private String internationalCode;

    @Column(name = "number", nullable = false)
    private String number;

    @Column(name = "user_id", columnDefinition = "BINARY(16)")
    private UUID userId;
}