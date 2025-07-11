package com.user.registretion.UserRegistration.DTOs;

public record AddressDTO(
        Byte type,
        String street,
        String complement,
        String country,
        String state,
        String city
        ) {
}