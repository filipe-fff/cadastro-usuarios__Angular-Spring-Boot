package com.user.registretion.UserRegistration.services;

import com.user.registretion.UserRegistration.controllers.dtos.ResponseError;
import com.user.registretion.UserRegistration.dtos.save.*;
import com.user.registretion.UserRegistration.dtos.update.*;
import com.user.registretion.UserRegistration.components.StorageComponent;
import com.user.registretion.UserRegistration.models.*;
import com.user.registretion.UserRegistration.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
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
    public ResponseEntity<User> save(UserSaveDTO userSaveDTO) {
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

        System.out.println("user_ =>" + user);

        savePhoneList(user, userSaveDTO.phoneList());
        saveAddressList(user, userSaveDTO.addressList());
        saveDependentsList(user, userSaveDTO.dependents());
        saveMusicsList(user, userSaveDTO.musics());

        System.out.println("user= =>" + user);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userRepository.save(user));
    }

    // READ
    @Transactional
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Transactional
    public ResponseEntity<Object> userById(String id) {
        try {
            var userId = UUID.fromString(id);

            Optional<User> userOptional = userRepository.findById(userId);

            if (userOptional.isPresent()) {
                return ResponseEntity.ok(userOptional.get());
            }

            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            ResponseError errorDTO = ResponseError.defaultAnswer("Invalid UUID format");
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        }
    }

    @Transactional
    public ResponseEntity<Object> existsByIdNotAndName(String id, String name) {
        try {
            UUID userId = UUID.fromString(id);
            boolean exists = userRepository.existsByIdNotAndName(userId, name);
            return ResponseEntity.ok(exists);
        } catch (IllegalArgumentException e) {
            ResponseError errorDTO = ResponseError.defaultAnswer("Invalid UUID format");
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        }
    }

    @Transactional
    public ResponseEntity<Object> existsByIdNotAndEmail(String id, String email) {
        try {
            UUID userId = UUID.fromString(id);
            boolean exists = userRepository.existsByIdNotAndEmail(userId, email);
            return ResponseEntity.ok(exists);
        } catch (IllegalArgumentException e) {
            ResponseError errorDTO = ResponseError.defaultAnswer("Invalid UUID format");
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        }
    }

    @Transactional
    public ResponseEntity<Object> existsByIdNotAndPassword(String id, String password) {
        try {
            UUID userId = UUID.fromString(id);
            boolean exists = userRepository.existsByIdNotAndPassword(userId, password);
            return ResponseEntity.ok(exists);
        } catch (IllegalArgumentException e) {
            ResponseError errorDTO = ResponseError.defaultAnswer("Invalid UUID format");
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        }
    }

    // UPDATE
    @Transactional
    public ResponseEntity<Object> update(String id, UserUpdateDTO userUpdateDTO) {
        try {
            UUID userId = UUID.fromString(id);

            Optional<User> userOptional = userRepository
                    .findById((userId));

            if (userOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            User user = userOptional.get();

            user.setId(userId);
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

            return ResponseEntity.ok(userRepository.save(user));
        } catch (IllegalArgumentException e) {
            ResponseError errorDTO = ResponseError.defaultAnswer("Invalid UUID format");
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        }
    }

    // DELETE
    @Transactional
    public ResponseEntity<Object> delete(String id) {
        try {
            UUID userId = UUID.fromString(id);

            Optional<User> userOptional = userRepository.findById(userId);

            if (userOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            this.userRepository.deleteById(userId);

            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            ResponseError errorDTO = ResponseError.defaultAnswer("Invalid UUID format");
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        }
    }

    @Transactional
    private void savePhoneList(User user, List<PhoneSaveDTO> phoneListDTO) {
        user.setPhoneList(
                phoneListDTO.stream().map(
                        p -> {
                            Phone phone = new Phone(
                                p.type(),
                                p.internationalCode(),
                                p.areaCode(),
                                p.number());
                            phone.setUser(user);
                            return phone;
                        }).toList());
    };

    @Transactional
    private void saveAddressList(User user, List<AddressSaveDTO> addressListDTO) {
        user.setAddressList(
                addressListDTO.stream().map(
                        a -> {
                            Address address = new Address(
                                a.type(),
                                a.street(),
                                a.complement(),
                                a.country(),
                                a.state(),
                                a.city());
                            address.setUser(user);
                            return address;
                        }).toList());
    }

    @Transactional
    private void saveDependentsList(User user, List<DependentSaveDTO> dependentsListDTO) {
        user.setDependents(dependentsListDTO.stream().map(
                d -> {
                    Dependent dependent = new Dependent(
                        d.name(),
                        d.age(),
                        d.document());
                    dependent.setUser(user);
                    return dependent;
                }).toList());
    }

    @Transactional
    private void saveMusicsList(User user, List<MusicSaveDTO> musicsListDTO) {
        user.setMusics(musicsListDTO.stream().map(
                m -> {
                    Music music = new Music(
                        m.title(),
                        m.band(),
                        m.genre(),
                        m.isFavorite());
                    music.setUser(user);
                    return  music;
                }).toList());
    }

    @Transactional
    private void updatePhoneList(User user, List<PhoneUpdateDTO> phoneListDTO) {
        Map<UUID, Phone> existsPhoneMap = user
                .getPhoneList()
                .stream()
                .collect(Collectors
                                .toMap(
                                        Phone::getId,
                                        phone -> phone,
                                        (existing, replacement) -> existing,
                                        LinkedHashMap::new
                                ));

        user.getPhoneList().clear();

        for (PhoneUpdateDTO phone : phoneListDTO) {
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
    private void updateAddressList(User user, List<AddressUpdateDTO> addressListDTO) {
        Map<UUID, Address> existsAddressMap = user
                .getAddressList()
                .stream()
                .collect(Collectors.toMap(
                        Address::getId,
                        address -> address,
                        (existing, replacement) -> existing,
                        LinkedHashMap::new
                ));

        user.getAddressList().clear();

        for (AddressUpdateDTO address : addressListDTO) {
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
    private void updateDependentsList(User user, List<DependentUpdateDTO> dependentsListDTO) {
        Map<UUID, Dependent> existsDependentMap = user
                .getDependents()
                .stream()
                .collect(Collectors
                        .toMap(
                                Dependent::getId,
                                dependent -> dependent,
                                (existing, replacement) -> existing,
                                LinkedHashMap::new
                        ));

        user.getDependents().clear();

        for (DependentUpdateDTO dependent : dependentsListDTO) {
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
    private void updateMusicsList(User user, List<MusicUpdateDTO> musicsListDTO) {
        Map<UUID, Music> existsMusicMap = user
                .getMusics()
                .stream()
                .collect(Collectors
                        .toMap(Music::getId,
                                music -> music,
                                (existing, replacement) -> existing,
                                LinkedHashMap::new
                        ));

        user.getMusics().clear();

        for (MusicUpdateDTO music : musicsListDTO) {
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