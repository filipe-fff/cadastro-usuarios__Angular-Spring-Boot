package com.user.registretion.UserRegistration.services;

import com.user.registretion.UserRegistration.repositories.DependentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DependentService {

    @Autowired
    DependentRepository dependentRepository;

    @Transactional
    public boolean existsByIdNotAndDocument(UUID id, Long document) {
        return dependentRepository.existsByIdNotAndDocument(id, document);
    }
}
