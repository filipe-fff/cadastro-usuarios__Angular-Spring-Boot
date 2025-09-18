package com.user.registretion.UserRegistration.dtos.user.update.dto;

import com.user.registretion.UserRegistration.dtos.user.abstracts.dto.IUserDTO;
import com.user.registretion.UserRegistration.models.User;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record UserUpdateDTO(
        String name,
        String email,
        String password,
        String country,
        String state,
        byte maritalStatus,
        BigDecimal monthlyIncome,
        LocalDate birthDate,
        List<PhoneUpdateDTO> phoneList,
        List<AddressUpdateDTO> addressList,
        List<DependentUpdateDTO> dependents,
        List<MusicUpdateDTO> musics
        ) implements IUserDTO {

    public static void toUser(User user, UserUpdateDTO userUpdateDTO) {

        user.setName(userUpdateDTO.name());
        user.setEmail(userUpdateDTO.email());
        user.setPassword(userUpdateDTO.password());
        user.setCountry(userUpdateDTO.country());
        user.setState(userUpdateDTO.state());
        user.setMaritalStatus(userUpdateDTO.maritalStatus());
        user.setMonthlyIncome(userUpdateDTO.monthlyIncome());
        user.setBirthDate(userUpdateDTO.birthDate());

        PhoneUpdateDTO.toPhoneList(user, userUpdateDTO.phoneList());
        AddressUpdateDTO.toAddressList(user, userUpdateDTO.addressList());
        DependentUpdateDTO.toDependentsList(user, userUpdateDTO.dependents());
        MusicUpdateDTO.toMusicsList(user, userUpdateDTO.musics());
    }
}