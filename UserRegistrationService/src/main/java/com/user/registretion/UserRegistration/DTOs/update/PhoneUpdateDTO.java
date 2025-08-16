package com.user.registretion.UserRegistration.DTOs.update;

import java.util.UUID;

public record PhoneUpdateDTO(
        UUID id,
        Byte type,
        String areaCode,
        String internationalCode,
        String number
    ) {
}