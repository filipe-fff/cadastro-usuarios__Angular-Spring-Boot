package com.user.registretion.UserRegistration.dtos.update;

import java.util.UUID;

public record PhoneUpdateDTO(
        UUID id,
        Byte type,
        String areaCode,
        String internationalCode,
        String number
    ) {
}