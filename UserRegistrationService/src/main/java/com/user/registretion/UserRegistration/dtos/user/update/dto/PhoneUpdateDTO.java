package com.user.registretion.UserRegistration.dtos.user.update.dto;

import java.util.UUID;

public record PhoneUpdateDTO(
        UUID id,
        Byte type,
        String areaCode,
        String internationalCode,
        String number
    ) {
}