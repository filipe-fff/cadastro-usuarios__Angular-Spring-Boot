package com.user.registretion.UserRegistration.services;

import com.user.registretion.UserRegistration.components.FileStoragePropertiesComponent;
import com.user.registretion.UserRegistration.controllers.dtos.ResponseError;
import com.user.registretion.UserRegistration.dtos.user.response.dto.UserDTO;
import com.user.registretion.UserRegistration.dtos.user.save.dto.UserSaveDTO;
import com.user.registretion.UserRegistration.dtos.user.update.dto.AddressUpdateDTO;
import com.user.registretion.UserRegistration.dtos.user.update.dto.DependentUpdateDTO;
import com.user.registretion.UserRegistration.dtos.user.update.dto.MusicUpdateDTO;
import com.user.registretion.UserRegistration.dtos.user.update.dto.PhoneUpdateDTO;
import com.user.registretion.UserRegistration.dtos.user.update.dto.UserUpdateDTO;
import com.user.registretion.UserRegistration.models.*;
import com.user.registretion.UserRegistration.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    FileStoragePropertiesComponent fileStoragePropertiesComponent;

    @Autowired
    public UserRepository userRepository;

    // CREATE
    @Transactional
    public ResponseEntity<Object> save(UserSaveDTO userSaveDTO, MultipartFile file) {
        User user = UserSaveDTO.toUser(userSaveDTO);

        User saveUser = userRepository.save(user);

        try {
            fileStoragePropertiesComponent
                    .save(saveUser.getId(), file, photoName -> saveUser.setPhotoUrl(photoName));
            userRepository.save(saveUser);
        } catch (IOException e) {
            ResponseError errorDTO = ResponseError.defaultAnswer("Photo is Invalid");
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saveUser);
    }

    // READ
    @Transactional
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Transactional
    public ResponseEntity<Object> userById(String id) {
        try {
            UUID userId = UUID.fromString(id);
            Optional<User> userOptional = userRepository.findById(userId);

            if (userOptional.isEmpty()) {
                ResponseError errorDTO = ResponseError.defaultAnswer("User not found");
                return ResponseEntity.status(errorDTO.status()).body(errorDTO);
            }

            User user = userOptional.get();

            return ResponseEntity.ok(user);

        } catch (IllegalArgumentException e) {
            ResponseError errorDTO = ResponseError.defaultAnswer("Invalid UUID format");
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        }
    }

    @Transactional
    public ResponseEntity<Object> userPhotoById(String id) {
        try {
            UUID userId = UUID.fromString(id);
            Optional<User> userOptional = userRepository.findById(userId);

            if (userOptional.isEmpty()) {
                ResponseError errorDTO = ResponseError.defaultAnswer("User not found");
                return ResponseEntity.status(errorDTO.status()).body(errorDTO);
            }

            String fileName = userOptional.get().getPhotoUrl();
            UrlResource resource = fileStoragePropertiesComponent.getFile(fileName);

            Path filePath = resource.getFile().toPath();
            String mimeType = Files.probeContentType(filePath);

            if (mimeType == null) {
                mimeType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(mimeType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                    .body(resource);

        } catch (IllegalArgumentException e) {
            ResponseError errorDTO = ResponseError.defaultAnswer("Invalid UUID format");
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        } catch (MalformedURLException e) {
            ResponseError errorDTO = ResponseError.notFound("Photo URL not found");
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        } catch (IOException e) {
            ResponseError errorDTO = ResponseError.notFound("File not found");
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
    public ResponseEntity<Object> update(String id, UserUpdateDTO userUpdateDTO, MultipartFile file) {
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

            fileStoragePropertiesComponent.save(userId, file, photoName -> user.setPhotoUrl(photoName));

            return ResponseEntity.ok(userRepository.save(user));
        } catch (IllegalArgumentException e) {
            ResponseError errorDTO = ResponseError.defaultAnswer("Invalid UUID format");
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        } catch (IOException e) {
            ResponseError errorDTO = ResponseError.defaultAnswer("Photo is Invalid");
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

            System.out.println("uri => " + userOptional.get().getPhotoUrl()  + "F");
            fileStoragePropertiesComponent.delete(userOptional.get().getPhotoUrl());
            this.userRepository.deleteById(userId);

            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            ResponseError errorDTO = ResponseError.defaultAnswer("Invalid UUID format");
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        } catch (IOException e) {
            ResponseError errorDTO = ResponseError.defaultAnswer("Invalid photo Uri");
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        }
    }

    @Transactional
    private void updatePhoneList(User user, List<PhoneUpdateDTO> phoneListDTO) {
        ArrayList<Phone> mutableList = new ArrayList<>(user.getPhoneList());
        Map<UUID, Phone> existsPhoneMap = mutableList
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
        ArrayList<Address> mutableList = new ArrayList<>(user.getAddressList());
        Map<UUID, Address> existsAddressMap = mutableList
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
        ArrayList<Dependent> mutableList = new ArrayList<>(user.getDependents());
        Map<UUID, Dependent> existsDependentMap = mutableList
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
        ArrayList<Music> mutableList = new ArrayList<>(user.getMusics());
        Map<UUID, Music> existsMusicMap = mutableList
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