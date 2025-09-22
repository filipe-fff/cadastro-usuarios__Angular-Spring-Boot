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

        userRepository.save(user);

        try {
            fileStoragePropertiesComponent
                    .save(user.getId(), file, user::setPhotoUrl);
            userRepository.save(user);
        } catch (IOException e) {
            ResponseError errorDTO = ResponseError.defaultAnswer("Photo is Invalid");
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(user);
    }

    // READ
    @Transactional
    public List<UserDTO> findAll() {
        return userRepository
                .findAll()
                .stream()
                .map(UserDTO::toUserDTO)
                .collect(Collectors.toCollection(ArrayList::new));
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

            UserDTO userDTO = UserDTO.toUserDTO(userOptional.get());

            return ResponseEntity.ok(userDTO);

        } catch (IllegalArgumentException e) {
            ResponseError errorDTO = ResponseError.defaultAnswer("Invalid UUID format");
            return ResponseEntity.status(errorDTO.status()).body(errorDTO);
        }
    }

    @Transactional
    public ResponseEntity<Object> userPhotoById(String id) {
        try {
            UUID userId = id == null ? null : UUID.fromString(id);
            assert userId != null;
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
            UUID userId = id == null ? null : UUID.fromString(id);
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
            UUID userId = id == null ? null : UUID.fromString(id);
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
            UUID userId = id == null ? null : UUID.fromString(id);
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
            UUID userId = id == null ? null : UUID.fromString(id);
            assert userId != null;
            Optional<User> userOptional = userRepository
                    .findById((userId));

            if (userOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            User user = userOptional.get();

            user.setId(userId);
            UserUpdateDTO.toUser(user, userUpdateDTO);

            fileStoragePropertiesComponent.save(userId, file, user::setPhotoUrl);

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
}