package com.user.registretion.UserRegistration.dtos.save;

public record PhoneSaveDTO(
        Byte type,
        String areaCode,
        String internationalCode,
        String number
    ) {
}