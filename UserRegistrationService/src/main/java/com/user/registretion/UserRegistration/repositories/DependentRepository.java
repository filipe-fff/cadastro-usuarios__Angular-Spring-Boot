package com.user.registretion.UserRegistration.repositories;

import com.user.registretion.UserRegistration.models.Dependent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DependentRepository extends JpaRepository<Dependent, UUID> {

}