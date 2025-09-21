package com.user.registretion.UserRegistration.services;

import com.user.registretion.UserRegistration.controllers.dtos.ResponseError;
import com.user.registretion.UserRegistration.repositories.DependentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DependentService {

    @Autowired
    DependentRepository dependentRepository;

    @Transactional
    public ResponseEntity<Object> existsByIdNotAndDocument(String id, Long document) {
        try {
            UUID documentID = id == null ? null : UUID.fromString(id);
            boolean exists = dependentRepository.existsByIdNotAndDocument(documentID, document);
            return ResponseEntity.ok(exists);
        } catch(IllegalArgumentException e) {
            ResponseError errorDTO = ResponseError.defaultAnswer("Invalid UUID format");
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        }
    }
}