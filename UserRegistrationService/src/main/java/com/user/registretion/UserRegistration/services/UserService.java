package com.user.registretion.UserRegistration.services;

import com.user.registretion.UserRegistration.DTOs.*;
import com.user.registretion.UserRegistration.components.StorageComponent;
import com.user.registretion.UserRegistration.models.*;
import com.user.registretion.UserRegistration.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final String storageUrl = "/home/filipe/Documentos/GitHub/cadastro-usuarios__Angular-Spring-Boot/UserRegistrationService/src/main/java/com/user/registretion/UserRegistration/storage/";

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public StorageComponent storageComponent;

    // CREATE
    @Transactional
    public User save(UserSaveDTO userSaveDTO) {
        User user = new User();

        user.setName(userSaveDTO.name());
        user.setPhotoUrl("");
        user.setPassword(userSaveDTO.password());
        user.setEmail(userSaveDTO.email());
        user.setCountry(userSaveDTO.country());
        user.setState(userSaveDTO.state());
        user.setMaritalStatus(userSaveDTO.maritalStatus());
        user.setMonthlyIncome(userSaveDTO.monthlyIncome());
        user.setBirthDate(userSaveDTO.birthDate());

        return userRepository.save(user);
    }

    // READ
    @Transactional
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Transactional
    public User userById(UUID id) {
        return userRepository.findById(id).orElse(null);
    }

    @Transactional
    public boolean existsByIdNotAndName(UUID id, String name) {
        return userRepository.existsByIdNotAndName(id, name);
    }

    @Transactional
    public boolean existsByIdNotAndEmail(UUID id, String email) {
        return userRepository.existsByIdNotAndEmail(id, email);
    }

    @Transactional
    public boolean existsByIdNotAndPassword(UUID id, String password) {
        return userRepository.existsByIdNotAndPassword(id, password);
    }

    // UPDATE
    @Transactional
    public User update(UserUpdateDTO userUpdateDTO) {
        User user = userRepository
                .findById((userUpdateDTO.id()))
                .orElseThrow(() -> new RuntimeException("User not found with id " + userUpdateDTO.id()));

        System.out.println("user before => " + user);

        user.setId(userUpdateDTO.id());
        user.setName(userUpdateDTO.name());
        user.setPassword(userUpdateDTO.password());
        user.setPhotoUrl("");
        user.setEmail(userUpdateDTO.email());
        user.setCountry(userUpdateDTO.country());
        user.setState(userUpdateDTO.state());
        user.setMaritalStatus(userUpdateDTO.maritalStatus());
        user.setMonthlyIncome(userUpdateDTO.monthlyIncome());
        user.setBirthDate(userUpdateDTO.birthDate());

        updatePhoneList(user, userUpdateDTO.phoneList());
        updateAddressList(user, userUpdateDTO.addressList());
        updateDependentsList(user, userUpdateDTO.dependents());
        updateMusicsList(user, userUpdateDTO.musics());

        System.out.println("user after => " + user);

        return userRepository.save(user);
    }

    // DELETE
    @Transactional
    public void delete(UUID id) {
        this.userRepository.deleteById(id);
    }

    @Transactional
    private void updatePhoneList(User user, List<PhoneDTO> phoneListDTO) {
        Map<UUID, Phone> existsPhoneMap = user
                .getPhoneList()
                .stream()
                .collect(Collectors
                                .toMap(
                                        Phone::getId,
                                        phone -> phone,
                                        (existing, replacement) -> existing
                                ));

        user.getPhoneList().clear();

        for (PhoneDTO phone : phoneListDTO) {
            Phone updatePhone;

            if (phone.id() != null && existsPhoneMap.containsKey(phone.id()))
                updatePhone = existsPhoneMap.get(phone.id());

            else updatePhone = new Phone();

            updatePhone.setType(phone.type());
            updatePhone.setInternationalCode(phone.internationalCode());
            updatePhone.setAreaCode(phone.areaCode());
            updatePhone.setNumber(phone.number());
            updatePhone.setUser(user);

            user.getPhoneList().add(updatePhone);
        }
    }

    @Transactional
    private void updateAddressList(User user, List<AddressDTO> addressListDTO) {
        Map<UUID, Address> existsAddressMap = user
                .getAddressList()
                .stream()
                .collect(Collectors.toMap(
                        Address::getId,
                        address -> address,
                        (existing, replacement) -> existing
                ));

        user.getAddressList().clear();

        for (AddressDTO address : addressListDTO) {
            Address updateAddress;

            if (address.id() != null && existsAddressMap.containsKey(address.id()))
                updateAddress = existsAddressMap.get(address.id());
            else updateAddress = new Address();

            updateAddress.setType(address.type());
            updateAddress.setStreet(address.street());
            updateAddress.setComplement(address.complement());
            updateAddress.setCountry(address.country());
            updateAddress.setState(address.state());
            updateAddress.setCity(address.city());
            updateAddress.setUser(user);

            user.getAddressList().add(updateAddress);
        }
    }

    @Transactional
    private void updateDependentsList(User user, List<DependentDTO> dependentsListDTO) {
        Map<UUID, Dependent> existsDependentMap = user
                .getDependents()
                .stream()
                .collect(Collectors
                        .toMap(
                                Dependent::getId,
                                dependent -> dependent,
                                (existing, replacement) -> existing
                        ));

        user.getDependents().clear();

        for (DependentDTO dependent : dependentsListDTO) {
            Dependent updateDependent;

            if (dependent.id() != null && existsDependentMap.containsKey(dependent.id()))
                updateDependent = existsDependentMap.get(dependent.id());
            else updateDependent = new Dependent();

            updateDependent.setName(dependent.name());
            updateDependent.setAge(dependent.age());
            updateDependent.setDocument(dependent.document());
            updateDependent.setUser(user);

            user.getDependents().add(updateDependent);
        }
    }

    @Transactional
    private void updateMusicsList(User user, List<MusicDTO> musicsListDTO) {
        Map<UUID, Music> existsMusicMap = user
                .getMusics()
                .stream()
                .collect(Collectors
                        .toMap(Music::getId,
                                music -> music,
                                (existing, replacement) -> existing
                        ));

        user.getMusics().clear();

        for (MusicDTO music : musicsListDTO) {
            Music updateMusic;

            if (music.id() != null && existsMusicMap.containsKey(music.id()))
                updateMusic = existsMusicMap.get(music.id());
            else updateMusic = new Music();

            updateMusic.setTitle(music.title());
            updateMusic.setBand(music.band());
            updateMusic.setGenre(music.genre());
            updateMusic.setIsFavorite(music.isFavorite());
            updateMusic.setUser(user);

            user.getMusics().add(updateMusic);
        }
    }
}