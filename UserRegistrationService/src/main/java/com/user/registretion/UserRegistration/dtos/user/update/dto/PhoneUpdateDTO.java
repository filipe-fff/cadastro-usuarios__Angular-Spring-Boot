package com.user.registretion.UserRegistration.dtos.user.update.dto;

import com.user.registretion.UserRegistration.models.Phone;
import com.user.registretion.UserRegistration.models.User;

import java.util.*;
import java.util.stream.Collectors;

public record PhoneUpdateDTO(
        UUID id,
        Byte type,
        String areaCode,
        String internationalCode,
        String number
    ) {

    public static void toPhone(User user, PhoneUpdateDTO phoneUpdateDTO, Map<UUID, Phone> phoneMap) {
        Phone phone;
        if (phoneUpdateDTO.id() != null && phoneMap.containsKey(phoneUpdateDTO.id()))
            phone = phoneMap.get(phoneUpdateDTO.id());

        else phone = new Phone();

        phone.setType(phoneUpdateDTO.type());
        phone.setInternationalCode(phoneUpdateDTO.internationalCode());
        phone.setAreaCode(phoneUpdateDTO.areaCode());
        phone.setNumber(phoneUpdateDTO.number());
        phone.setUser(user);

        user.getPhoneList().add(phone);
    }

    public static void toPhoneList(User user, List<PhoneUpdateDTO> phoneUpdateListDTO) {
        ArrayList<Phone> mutablePhoneList = new ArrayList<>(user.getPhoneList());
        Map<UUID, Phone> phoneMap = mutablePhoneList
                .stream()
                .collect(Collectors.toMap(
                        Phone::getId,
                        phone -> phone,
                        (existing, replacement) -> existing,
                        LinkedHashMap::new
                ));

        user.getPhoneList().clear();

        phoneUpdateListDTO
            .forEach(p -> PhoneUpdateDTO.toPhone(user, p, phoneMap));
    }
}