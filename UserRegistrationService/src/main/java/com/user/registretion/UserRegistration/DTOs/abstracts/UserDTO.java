package com.user.registretion.UserRegistration.DTOs.abstracts;

import com.user.registretion.UserRegistration.DTOs.AddressDTO;
import com.user.registretion.UserRegistration.DTOs.DependentDTO;
import com.user.registretion.UserRegistration.DTOs.MusicDTO;
import com.user.registretion.UserRegistration.DTOs.PhoneDTO;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface UserDTO {
    String name();
    String email();
    String country();
    String state();
    byte maritalStatus();
    BigDecimal monthlyIncome();
    LocalDate birthDate();
    List<PhoneDTO> phoneList();
    List<AddressDTO> addressList();
    List<DependentDTO> dependents();
    List<MusicDTO> musics();
}