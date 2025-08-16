package com.user.registretion.UserRegistration.DTOs.update;

import java.util.UUID;

public record AddressUpdateDTO(
        UUID id,
        Byte type,
        String street,
        String complement,
        String country,
        String state,
        String city
    ) {
}