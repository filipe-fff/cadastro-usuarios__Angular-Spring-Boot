package com.user.registretion.UserRegistration.dtos.user.response.dto;

import com.user.registretion.UserRegistration.models.Dependent;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public record DependentDTO(
        UUID id,
        String name,
        Byte age,
        Long document
    ) {

    public static DependentDTO toDependentDTO(Dependent dependent) {
        return new DependentDTO(
                dependent.getId(),
                dependent.getName(),
                dependent.getAge(),
                dependent.getDocument()
        );
    }

    public static List<DependentDTO> dependentsListDTO(List<Dependent> dependentsList) {
        return dependentsList
                .stream()
                .map(DependentDTO::toDependentDTO)
                .collect(Collectors.toCollection(ArrayList::new));
    }
}