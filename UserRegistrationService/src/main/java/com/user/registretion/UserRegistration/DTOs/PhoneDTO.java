package com.user.registretion.UserRegistration.DTOs;

import java.util.UUID;

public record PhoneDTO(
        UUID id,
        Byte type,
        String areaCode,
        String internationalCode,
        String number
        ) {
}