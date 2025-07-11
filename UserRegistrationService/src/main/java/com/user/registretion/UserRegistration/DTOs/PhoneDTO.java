package com.user.registretion.UserRegistration.DTOs;

public record PhoneDTO(
        Byte type,
        String areaCode,
        String internationalCode,
        String number
        ) {
}