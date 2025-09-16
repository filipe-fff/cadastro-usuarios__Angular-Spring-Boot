package com.user.registretion.UserRegistration.dtos.user.save.dto;

import com.user.registretion.UserRegistration.dtos.user.abstracts.dto.IUserDTO;
import com.user.registretion.UserRegistration.models.User;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record UserSaveDTO(
        String name,
        String email,
        String password,
        String country,
        String state,
        byte maritalStatus,
        BigDecimal monthlyIncome,
        LocalDate birthDate,
        List<PhoneSaveDTO> phoneList,
        List<AddressSaveDTO> addressList,
        List<DependentSaveDTO> dependents,
        List<MusicSaveDTO> musics
        ) implements IUserDTO {

    public static User toUser(UserSaveDTO userSaveDTO) {
        User user = new User();

        user.setName(userSaveDTO.name());
        user.setPassword(userSaveDTO.password());
        user.setEmail(userSaveDTO.email());
        user.setCountry(userSaveDTO.country());
        user.setState(userSaveDTO.state());
        user.setMaritalStatus(userSaveDTO.maritalStatus());
        user.setMonthlyIncome(userSaveDTO.monthlyIncome());
        user.setBirthDate(userSaveDTO.birthDate());

        PhoneSaveDTO.toPhoneList(user, userSaveDTO.phoneList());
        AddressSaveDTO.toAddressList(user, userSaveDTO.addressList());
        DependentSaveDTO.toDependentsList(user, userSaveDTO.dependents());
        MusicSaveDTO.toMusicsList(user, userSaveDTO.musics());

        return user;
    }
}