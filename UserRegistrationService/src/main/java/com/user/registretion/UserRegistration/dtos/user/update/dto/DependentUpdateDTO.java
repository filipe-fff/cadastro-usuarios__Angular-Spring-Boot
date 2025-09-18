package com.user.registretion.UserRegistration.dtos.user.update.dto;

import com.user.registretion.UserRegistration.models.Dependent;
import com.user.registretion.UserRegistration.models.User;

import java.util.*;
import java.util.stream.Collectors;

public record DependentUpdateDTO(
        UUID id,
        String name,
        Byte age,
        Long document
    ) {

    public static void toDependent(User user, DependentUpdateDTO dependentUpdateDTO, Map<UUID, Dependent> dependentsMap) {
        Dependent dependent;
        if (dependentUpdateDTO.id() != null && dependentsMap.containsKey(dependentUpdateDTO.id()))
            dependent = dependentsMap.get(dependentUpdateDTO.id());

        else dependent = new Dependent();

        dependent.setName(dependentUpdateDTO.name());
        dependent.setAge(dependentUpdateDTO.age());
        dependent.setDocument(dependentUpdateDTO.document());
        dependent.setUser(user);

        user.getDependents().add(dependent);
    }

    public static void toDependentsList(User user, List<DependentUpdateDTO> dependentsUpdateListDTOS) {
        ArrayList<Dependent> mutableDependentsList = new ArrayList<>(user.getDependents());
        Map<UUID, Dependent> dependentsMap = mutableDependentsList
                .stream()
                .collect(Collectors.toMap(
                        Dependent::getId,
                        dependent -> dependent,
                        (existing, replacement) -> existing,
                        LinkedHashMap::new
                ));

        user.getDependents().clear();

        dependentsUpdateListDTOS
                .forEach(d -> DependentUpdateDTO.toDependent(user, d, dependentsMap));
    }
}