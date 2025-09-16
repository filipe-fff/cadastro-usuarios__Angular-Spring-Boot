package com.user.registretion.UserRegistration.dtos.user.save.dto;

import com.user.registretion.UserRegistration.models.Dependent;
import com.user.registretion.UserRegistration.models.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public record DependentSaveDTO(
        String name,
        Byte age,
        Long document
    ) {

    public static Dependent toDependent(User user, DependentSaveDTO dependentSaveDTO) {
        Dependent dependent = new Dependent(
                dependentSaveDTO.name(),
                dependentSaveDTO.age(),
                dependentSaveDTO.document()
        );
        dependent.setUser(user);

        return dependent;
    }

    public static void toDependentsList(User user, List<DependentSaveDTO> dependentSaveListDTO) {
        user.setDependents(dependentSaveListDTO
                .stream()
                .map(d -> toDependent(user, d))
                .collect(Collectors.toCollection(ArrayList::new)));
    }
}