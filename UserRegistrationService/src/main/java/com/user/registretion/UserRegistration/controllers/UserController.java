package com.user.registretion.UserRegistration.controllers;

import com.user.registretion.UserRegistration.DTOs.UserSaveDTO;
import com.user.registretion.UserRegistration.DTOs.UserUpdateDTO;
import com.user.registretion.UserRegistration.models.User;
import com.user.registretion.UserRegistration.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user-registration")
public class UserController {
    @Autowired
    UserService userService;

    // CREATE
    @PostMapping(value = "/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public User save(@RequestPart("user") UserSaveDTO userSaveDTO, @Validated @RequestPart("photo") MultipartFile photo) {
        return this.userService.save(userSaveDTO, photo);
    }

    // READ
    @GetMapping
    public List<User> usersList() {
        return this.userService.findAll();
    }

    @GetMapping("/user/{id}")
    public User userById(@PathVariable("id") UUID id) {
        return this.userService.userById(id);
    }

    @PutMapping("/exists-name/{id}")
    public boolean existsByIdNotAndName(@PathVariable("id") UUID id, @RequestBody String name) {
        return this.userService.existsByIdNotAndName(id, name);
    }

    @PutMapping("/exists-email/{id}")
    public boolean existsByIdNotAndEmail(@PathVariable("id") UUID id, @RequestBody String email) {
        return this.userService.existsByIdNotAndEmail(id, email);
    }

    @PutMapping("/exists-password/{id}")
    public boolean existsByIdNotAndPassword(@PathVariable("id") UUID id, @RequestBody String password) {
        return userService.existsByIdNotAndPassword(id, password);
    }

    // UPDATE
    @PostMapping("/update")
    public User update(@RequestBody UserUpdateDTO userUpdateDTO) {
        return this.userService.update(userUpdateDTO);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") UUID id) {
        this.userService.delete(id);
    }
}