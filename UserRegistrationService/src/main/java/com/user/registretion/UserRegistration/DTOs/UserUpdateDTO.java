package com.user.registretion.UserRegistration.DTOs;

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
        List<PhoneDTO> phoneList,
        List<AddressDTO> addressList,
        List<DependentDTO> dependents,
        List<MusicDTO> musics
        ) implements UserDTO {
}