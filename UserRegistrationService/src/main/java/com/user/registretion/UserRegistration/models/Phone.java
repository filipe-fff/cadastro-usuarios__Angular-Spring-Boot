package com.user.registretion.UserRegistration.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.user.registretion.UserRegistration.DTOs.PhoneDTO;
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

    public Phone(User user, PhoneDTO phoneDTO) {
        this.preparePhone(user, phoneDTO);
    }

    public Phone(UUID id, User user, PhoneDTO phoneDTO) {
        this.preparePhone(user, phoneDTO);
        this.setId(id);
    }

    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, columnDefinition = "BINARY(16)")
    private UUID id;

    @NonNull
    @Column(name = "type", nullable = false)
    private Byte type;

    @NonNull
    @Column(name = "international_code", length = 3)
    private String internationalCode;

    @NonNull
    @Column(name = "area_code", length = 2)
    private String areaCode;

    @NonNull
    @Column(name = "number", length = 10)
    private String number;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    private void preparePhone(User user, PhoneDTO phoneDTO) {
        this.setType(phoneDTO.type());
        this.setInternationalCode(phoneDTO.internationalCode());
        this.setAreaCode(phoneDTO.areaCode());
        this.setNumber(phoneDTO.number());
        this.setUser(user);
    }
}