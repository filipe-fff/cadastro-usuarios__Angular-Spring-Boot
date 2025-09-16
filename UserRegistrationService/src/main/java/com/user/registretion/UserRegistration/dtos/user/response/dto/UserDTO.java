package com.user.registretion.UserRegistration.dtos.user.response.dto;

import com.user.registretion.UserRegistration.dtos.user.abstracts.dto.IUserDTO;
import com.user.registretion.UserRegistration.models.User;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public record UserDTO(
    UUID id,
    String name,
    String photoUrl,
    String email,
    String password,
    String country,
    String state,
    byte maritalStatus,
    BigDecimal monthlyIncome,
    LocalDate birthDate,
    List<PhoneDTO> phoneList,
    List<AddressDTO> addressList,
    List<DependentDTO> dependents,
    List<MusicDTO> musics
) implements IUserDTO {

    public static UserDTO toUserDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getPhotoUrl(),
                user.getEmail(),
                user.getPassword(),
                user.getCountry(),
                user.getState(),
                user.getMaritalStatus(),
                user.getMonthlyIncome(),
                user.getBirthDate(),
                PhoneDTO.PhoneListDTO(user.getPhoneList()),
                AddressDTO.toAddressListDTO(user.getAddressList()),
                DependentDTO.dependentsListDTO(user.getDependents()),
                MusicDTO.toMusicsListDTO(user.getMusics())
        );
    }

    public static List<UserDTO> toUserListDTO(List<User> usersList) {
        return usersList
                .stream()
                .map(UserDTO::toUserDTO)
                .collect(Collectors.toCollection(ArrayList::new));
    }
}