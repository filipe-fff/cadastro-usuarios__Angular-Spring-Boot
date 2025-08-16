package com.user.registretion.UserRegistration.DTOs.response;

import java.util.UUID;

public record PhoneDTO(
        UUID id,
        Byte type,
        String areaCode,
        String internationalCode,
        String number
    ) {
}