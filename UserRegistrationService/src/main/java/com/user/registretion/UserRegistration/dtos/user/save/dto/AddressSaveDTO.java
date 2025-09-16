package com.user.registretion.UserRegistration.dtos.user.save.dto;

import com.user.registretion.UserRegistration.models.Address;
import com.user.registretion.UserRegistration.models.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public record AddressSaveDTO(
        Byte type,
        String street,
        String complement,
        String country,
        String state,
        String city
    ) {

    public static Address toAddress(User user, AddressSaveDTO addressSaveDTO) {
        Address address = new Address(
                addressSaveDTO.type(),
                addressSaveDTO.street(),
                addressSaveDTO.complement(),
                addressSaveDTO.country(),
                addressSaveDTO.state(),
                addressSaveDTO.city()
        );
        address.setUser(user);

        return address;
    }

    public static void toAddressList(User user, List<AddressSaveDTO> aaddressSaveListDTO) {
        user.setAddressList(aaddressSaveListDTO
                .stream()
                .map(a -> toAddress(user, a))
                .collect(Collectors.toCollection(ArrayList::new)));
    }
}