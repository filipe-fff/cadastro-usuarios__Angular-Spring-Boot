package com.user.registretion.UserRegistration.DTOs;

import java.util.UUID;

public record AddressDTO(
        UUID id,
        Byte type,
        String street,
        String complement,
        String country,
        String state,
        String city
        ) {
}