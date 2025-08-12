package com.user.registretion.UserRegistration.controllers;

import com.user.registretion.UserRegistration.DTOs.PhoneDTO;
import com.user.registretion.UserRegistration.DTOs.UserSaveDTO;
import com.user.registretion.UserRegistration.DTOs.UserUpdateDTO;
import com.user.registretion.UserRegistration.models.User;
import com.user.registretion.UserRegistration.services.DependentService;
import com.user.registretion.UserRegistration.services.PhoneService;
import com.user.registretion.UserRegistration.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user-registration")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    PhoneService phoneService;

    @Autowired
    DependentService dependentService;

    // CREATE
    @PostMapping(value = "/save")
    public User save(@RequestBody UserSaveDTO userSaveDTO) {
        return this.userService.save(userSaveDTO);
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

    @PutMapping("/exists-name")
    public boolean existsByIdNotAndName(@RequestBody String name) {
        return this.userService.existsByIdNotAndName(null, name);
    }

    @PutMapping("/exists-name/{id}")
    public boolean existsByIdNotAndName(@PathVariable("id") UUID id, @RequestBody String name) {
        return this.userService.existsByIdNotAndName(id, name);
    }

    @PutMapping("/exists-email")
    public boolean existsByIdNotAndEmail(@RequestBody String email) {
        return this.userService.existsByIdNotAndEmail(null, email);
    }

    @PutMapping("/exists-email/{id}")
    public boolean existsByIdNotAndEmail(@PathVariable("id") UUID id, @RequestBody String email) {
        return this.userService.existsByIdNotAndEmail(id, email);
    }

    @PutMapping("/exists-password")
    public boolean existsByIdNotAndPassword(@RequestBody String password) {
        return userService.existsByIdNotAndPassword(null, password);
    }

    @PutMapping("/exists-password/{id}")
    public boolean existsByIdNotAndPassword(@PathVariable("id") UUID id, @RequestBody String password) {
        return userService.existsByIdNotAndPassword(id, password);
    }

    @PutMapping("/exists-phone")
    public boolean existsByIdNotAndPhone(@RequestBody PhoneDTO phoneDTO) {
        return phoneService.existsIdNotAndPhone(null, phoneDTO);
    }

    @PutMapping("/exists-phone/{userId}")
    public boolean existsByIdNotAndPhone(@PathVariable("userId") UUID userId, @RequestBody PhoneDTO phoneDTO) {
        return phoneService.existsIdNotAndPhone(userId, phoneDTO);
    }

    @PutMapping("/exists-document")
    public boolean existsByIdNotAndDocument(@RequestBody Long document) {
        return dependentService.existsByIdNotAndDocument(null, document);
    }

    @PutMapping("/exists-document/{id}")
    public boolean existsByIdNotAndDocument(@PathVariable("id") UUID id, @RequestBody Long document) {
        return dependentService.existsByIdNotAndDocument(id, document);
    }

    // UPDATE
    @PostMapping("/update")
    public User update(@RequestBody UserUpdateDTO userUpdateDTO) {
        System.out.println("ok");
        return this.userService.update(userUpdateDTO);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") UUID id) {
        this.userService.delete(id);
    }
}