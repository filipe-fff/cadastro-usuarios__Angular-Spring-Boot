package com.user.registretion.UserRegistration.dtos.update;

import com.user.registretion.UserRegistration.dtos.abstracts.UserDTO;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record UserUpdateDTO(
        String name,
        String photoUrl,
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
        ) implements UserDTO {
}