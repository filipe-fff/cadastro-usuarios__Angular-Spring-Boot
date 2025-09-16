package com.user.registretion.UserRegistration.dtos.user.response.dto;

import com.user.registretion.UserRegistration.models.Address;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public record AddressDTO(
        UUID id,
        Byte type,
        String street,
        String complement,
        String country,
        String state,
        String city
    ) {

    public static AddressDTO toAddressDTO(Address address) {
        return new AddressDTO(
                address.getId(),
                address.getType(),
                address.getStreet(),
                address.getComplement(),
                address.getCountry(),
                address.getState(),
                address.getCity()
        );
    }

    public static List<AddressDTO> toAddressListDTO(List<Address> addressList) {
        return addressList
                .stream()
                .map(AddressDTO::toAddressDTO)
                .collect(Collectors.toCollection(ArrayList::new));
    }
}