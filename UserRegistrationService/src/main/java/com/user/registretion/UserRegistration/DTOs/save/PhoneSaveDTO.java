package com.user.registretion.UserRegistration.DTOs.save;

public record PhoneSaveDTO(
        Byte type,
        String areaCode,
        String internationalCode,
        String number
    ) {
}