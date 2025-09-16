package com.user.registretion.UserRegistration.dtos.user.save.dto;

import com.user.registretion.UserRegistration.models.Phone;
import com.user.registretion.UserRegistration.models.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public record PhoneSaveDTO(
        Byte type,
        String areaCode,
        String internationalCode,
        String number
    ) {

    public static Phone toPhone(User user, PhoneSaveDTO phoneSaveDTO) {
        Phone phone = new Phone(
                phoneSaveDTO.type(),
                phoneSaveDTO.internationalCode(),
                phoneSaveDTO.areaCode(),
                phoneSaveDTO.number()
        );
        phone.setUser(user);

        return phone;
    }

    public static void toPhoneList(User user, List<PhoneSaveDTO> phoneSaveListDTO) {
        user.setPhoneList(phoneSaveListDTO
                .stream()
                .map(p -> toPhone(user, p))
                .collect(Collectors.toCollection(ArrayList::new)));
    }
}