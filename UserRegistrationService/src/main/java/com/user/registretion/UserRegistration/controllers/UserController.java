package com.user.registretion.UserRegistration.controllers;

import com.user.registretion.UserRegistration.DTOs.response.PhoneDTO;
import com.user.registretion.UserRegistration.DTOs.save.UserSaveDTO;
import com.user.registretion.UserRegistration.DTOs.update.UserUpdateDTO;
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
    @PostMapping
    public User save(@RequestBody UserSaveDTO userSaveDTO) {
        return this.userService.save(userSaveDTO);
    }

    // READ
    @GetMapping
    public List<User> usersList() {
        return this.userService.findAll();
    }

    @GetMapping("/{id}")
    public User userById(@PathVariable("id") UUID id) {
        return this.userService.userById(id);
    }

    @PutMapping("/exists-name")
    public boolean existsByIdNotAndName(@RequestBody String name) {
        return this.userService.existsByIdNotAndName(null, name);
    }

    @PutMapping("/{id}/exists-name")
    public boolean existsByIdNotAndName(@PathVariable("id") UUID id, @RequestBody String name) {
        return this.userService.existsByIdNotAndName(id, name);
    }

    @PutMapping("/exists-email")
    public boolean existsByIdNotAndEmail(@RequestBody String email) {
        return this.userService.existsByIdNotAndEmail(null, email);
    }

    @PutMapping("/{id}/exists-email")
    public boolean existsByIdNotAndEmail(@PathVariable("id") UUID id, @RequestBody String email) {
        return this.userService.existsByIdNotAndEmail(id, email);
    }

    @PutMapping("/exists-password")
    public boolean existsByIdNotAndPassword(@RequestBody String password) {
        return userService.existsByIdNotAndPassword(null, password);
    }

    @PutMapping("/{id}/exists-password")
    public boolean existsByIdNotAndPassword(@PathVariable("id") UUID id, @RequestBody String password) {
        return userService.existsByIdNotAndPassword(id, password);
    }

    @PutMapping("/exists-phone")
    public boolean existsByIdNotAndPhone(@RequestBody PhoneDTO phoneDTO) {
        return phoneService.existsIdNotAndPhone(null, phoneDTO);
    }

    @PutMapping("/{id}/exists-phone")
    public boolean existsByIdNotAndPhone(@PathVariable("id") UUID userId, @RequestBody PhoneDTO phoneDTO) {
        return phoneService.existsIdNotAndPhone(userId, phoneDTO);
    }

    @PutMapping("/exists-document")
    public boolean existsByIdNotAndDocument(@RequestBody Long document) {
        return dependentService.existsByIdNotAndDocument(null, document);
    }

    @PutMapping("/{id}/exists-document")
    public boolean existsByIdNotAndDocument(@PathVariable("id") UUID id, @RequestBody Long document) {
        return dependentService.existsByIdNotAndDocument(id, document);
    }

    // UPDATE
    @PutMapping("/{id}")
    public User update(@PathVariable("id") UUID id, @RequestBody UserUpdateDTO userUpdateDTO) {
        return this.userService.update(id, userUpdateDTO);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") UUID id) {
        System.out.println("0000000000000000 => " + id);
        this.userService.delete(id);
    }
}