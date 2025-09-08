package com.user.registretion.UserRegistration.dtos.response;

import java.util.UUID;

public record PhoneDTO(
        UUID id,
        Byte type,
        String areaCode,
        String internationalCode,
        String number
    ) {
}