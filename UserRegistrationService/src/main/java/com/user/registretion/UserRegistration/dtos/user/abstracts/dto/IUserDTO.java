package com.user.registretion.UserRegistration.dtos.user.abstracts.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface IUserDTO {
    String name();
    String email();
    String password();
    String country();
    String state();
    byte maritalStatus();
    BigDecimal monthlyIncome();
    LocalDate birthDate();
}