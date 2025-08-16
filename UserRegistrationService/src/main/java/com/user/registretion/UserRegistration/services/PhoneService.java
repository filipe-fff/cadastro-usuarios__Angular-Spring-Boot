package com.user.registretion.UserRegistration.services;

import com.user.registretion.UserRegistration.DTOs.response.PhoneDTO;
import com.user.registretion.UserRegistration.repositories.PhoneRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PhoneService {

    @Autowired
    PhoneRepository phoneRepository;

    @Transactional
    public boolean existsIdNotAndPhone(UUID userId, PhoneDTO phoneDTO) {
        return phoneRepository.existsByUserIdNotAndInternationalCodeAndAreaCodeAndNumber(
                userId,
                phoneDTO.internationalCode(),
                phoneDTO.areaCode(),
                phoneDTO.number()
        );
    }
}
