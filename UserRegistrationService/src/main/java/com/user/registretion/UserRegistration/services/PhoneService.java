package com.user.registretion.UserRegistration.services;

import com.user.registretion.UserRegistration.controllers.dtos.ResponseError;
import com.user.registretion.UserRegistration.dtos.user.response.dto.PhoneDTO;
import com.user.registretion.UserRegistration.repositories.PhoneRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PhoneService {

    @Autowired
    PhoneRepository phoneRepository;

    @Transactional
    public ResponseEntity<Object> existsIdNotAndPhone(String id, PhoneDTO phoneDTO) {
        try {
            UUID userId = UUID.fromString(id);
            boolean exists = phoneRepository.existsByUserIdNotAndInternationalCodeAndAreaCodeAndNumber(
                    userId,
                    phoneDTO.internationalCode(),
                    phoneDTO.areaCode(),
                    phoneDTO.number()
            );

            return ResponseEntity.ok(exists);
        } catch (IllegalArgumentException e) {
            ResponseError errorDTO = ResponseError.defaultAnswer("Invalid UUID format");
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        }
    }
}
