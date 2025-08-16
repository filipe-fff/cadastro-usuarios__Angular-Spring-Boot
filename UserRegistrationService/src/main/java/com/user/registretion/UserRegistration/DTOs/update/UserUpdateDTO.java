package com.user.registretion.UserRegistration.DTOs.update;

import com.user.registretion.UserRegistration.DTOs.abstracts.UserDTO;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record UserUpdateDTO(
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
        List<PhoneUpdateDTO> phoneList,
        List<AddressUpdateDTO> addressList,
        List<DependentUpdateDTO> dependents,
        List<MusicUpdateDTO> musics
        ) implements UserDTO {
}