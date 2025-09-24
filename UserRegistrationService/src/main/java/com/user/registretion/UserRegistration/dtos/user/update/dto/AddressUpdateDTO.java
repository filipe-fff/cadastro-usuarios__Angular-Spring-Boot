package com.user.registretion.UserRegistration.dtos.user.update.dto;

import com.user.registretion.UserRegistration.models.Address;
import com.user.registretion.UserRegistration.models.User;

import java.util.*;
import java.util.stream.Collectors;

public record AddressUpdateDTO(
        UUID id,
        Byte type,
        String street,
        String complement,
        String country,
        String state,
        String city
    ) {

    public static void toAddress(User user, AddressUpdateDTO addressUpdateDTO, Map<UUID, Address> addressMap) {
        Address address;
        if (addressUpdateDTO.id() != null && addressMap.containsKey(addressUpdateDTO.id()))
            address = addressMap.get(addressUpdateDTO.id());

        else address = new Address();

        address.setType(addressUpdateDTO.type());
        address.setStreet(addressUpdateDTO.street());
        address.setComplement((addressUpdateDTO.complement()));
        address.setCountry(addressUpdateDTO.country());
        address.setState(addressUpdateDTO.state());
        address.setCity(addressUpdateDTO.city());
        address.setUser(user);

        user.getAddressList().add(address);
    }

    public static void toAddressList(User user, List<AddressUpdateDTO> addressUpdateListDTO) {
        ArrayList<Address> mutableAddressList = new ArrayList<>(user.getAddressList());
        Map<UUID, Address> addressMap = mutableAddressList
                .stream()
                .collect(Collectors.toMap(
                        Address::getId,
                        address -> address,
                        (existing, replacement) -> existing,
                        LinkedHashMap::new
                ));

        user.getAddressList().removeIf(a ->
                addressUpdateListDTO
                        .stream()
                        .noneMatch(dto -> dto.id() != null && dto.id().equals(a.getId())));

        addressUpdateListDTO
                .forEach(a -> AddressUpdateDTO.toAddress(user, a, addressMap));
    }
}