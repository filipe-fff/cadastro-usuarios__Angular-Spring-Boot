package com.user.registretion.UserRegistration.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.user.registretion.UserRegistration.DTOs.AddressDTO;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "address")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@ToString(exclude = "user")
public class Address {

    public Address(User user, AddressDTO addressDTO) {
        this.prepareAddress(user, addressDTO);
    }

    public Address(UUID id, User user, AddressDTO addressDTO) {
        this.prepareAddress(user, addressDTO);
        this.setId(id);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, columnDefinition = "BINARY(16)")
    private UUID id;

    @NonNull
    @Column(name = "type", nullable = false)
    private Byte type;

    @NonNull
    @Column(name = "street", nullable = false)
    private String street;

    @NonNull
    @Column(name = "complement", nullable = false)
    private String complement;

    @NonNull
    @Column(name = "country", nullable = false)
    private String country;

    @NonNull
    @Column(name = "state", nullable = false)
    private String state;

    @NonNull
    @Column(name = "city", nullable = false)
    private String city;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    private void prepareAddress(User user, AddressDTO addressDTO) {
        this.setType(addressDTO.type());
        this.setStreet(addressDTO.street());
        this.setComplement(addressDTO.complement());
        this.setCountry(addressDTO.country());
        this.setState(addressDTO.state());
        this.setCity(addressDTO.city());
        this.setUser(user);
    }
}