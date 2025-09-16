package com.user.registretion.UserRegistration.dtos.user.response.dto;

import com.user.registretion.UserRegistration.models.Phone;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public record PhoneDTO(
        UUID id,
        Byte type,
        String internationalCode,
        String areaCode,
        String number
    ) {

    public static PhoneDTO toPhoneDTO(Phone phone) {
        return new PhoneDTO(
                phone.getId(),
                phone.getType(),
                phone.getInternationalCode(),
                phone.getAreaCode(),
                phone.getNumber()
        );
    }

    public static List<PhoneDTO> PhoneListDTO(List<Phone> phoneList) {
        return phoneList
                .stream()
                .map(PhoneDTO::toPhoneDTO)
                .collect(Collectors.toCollection(ArrayList::new));
    }
}