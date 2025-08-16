package com.user.registretion.UserRegistration.DTOs.save;

public record AddressSaveDTO(
        Byte type,
        String street,
        String complement,
        String country,
        String state,
        String city
    ) {
}