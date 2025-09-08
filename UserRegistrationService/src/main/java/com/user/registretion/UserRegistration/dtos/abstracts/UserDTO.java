package com.user.registretion.UserRegistration.dtos.abstracts;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface UserDTO {
    String name();
    String photoUrl();
    String email();
    String password();
    String country();
    String state();
    byte maritalStatus();
    BigDecimal monthlyIncome();
    LocalDate birthDate();
}