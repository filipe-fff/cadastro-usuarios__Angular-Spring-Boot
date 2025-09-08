package com.user.registretion.UserRegistration.dtos.save;

import com.user.registretion.UserRegistration.dtos.abstracts.UserDTO;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record UserSaveDTO(
        String name,
        String photoUrl,
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
        ) implements UserDTO {
}