package com.user.registretion.UserRegistration.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.user.registretion.UserRegistration.DTOs.response.PhoneDTO;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "phone")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@ToString(exclude = "user")
public class Phone {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, columnDefinition = "BINARY(16)")
    private UUID id;

    @NonNull
    @Column(name = "type", nullable = false)
    private Byte type;

    @NonNull
    @Column(name = "international_code", nullable = false, length = 3)
    private String internationalCode;

    @NonNull
    @Column(name = "area_code", nullable = false, length = 2)
    private String areaCode;

    @NonNull
    @Column(name = "number", nullable = false, length = 10)
    private String number;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
}