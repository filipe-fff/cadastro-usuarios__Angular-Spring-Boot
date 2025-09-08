package com.user.registretion.UserRegistration.controllers;

import com.user.registretion.UserRegistration.controllers.dtos.ResponseError;
import com.user.registretion.UserRegistration.dtos.response.PhoneDTO;
import com.user.registretion.UserRegistration.dtos.save.UserSaveDTO;
import com.user.registretion.UserRegistration.dtos.update.UserUpdateDTO;
import com.user.registretion.UserRegistration.models.User;
import com.user.registretion.UserRegistration.services.DependentService;
import com.user.registretion.UserRegistration.services.PhoneService;
import com.user.registretion.UserRegistration.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
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
    public ResponseEntity<User> save(@RequestBody UserSaveDTO userSaveDTO) {
        return this.userService.save(userSaveDTO);
    }

    // READ
    @GetMapping
    public ResponseEntity<List<User>> usersList() {
        return ResponseEntity.ok(this.userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> userById(@PathVariable("id") String id) {
        return this.userService.userById(id);
    }

    @PutMapping("/exists-name")
    public ResponseEntity<Object> existsByIdNotAndName(@RequestBody String name) {
        return this.userService.existsByIdNotAndName(null, name);
    }

    @PutMapping("/{id}/exists-name")
    public ResponseEntity<Object> existsByIdNotAndName(@PathVariable("id") String id, @RequestBody String name) {
        return this.userService.existsByIdNotAndName(id, name);
    }

    @PutMapping("/exists-email")
    public ResponseEntity<Object> existsByIdNotAndEmail(@RequestBody String email) {
        return this.userService.existsByIdNotAndEmail(null, email);
    }

    @PutMapping("/{id}/exists-email")
    public ResponseEntity<Object> existsByIdNotAndEmail(@PathVariable("id") String id, @RequestBody String email) {
        return this.userService.existsByIdNotAndEmail(id, email);
    }

    @PutMapping("/exists-password")
    public ResponseEntity<Object> existsByIdNotAndPassword(@RequestBody String password) {
        return userService.existsByIdNotAndPassword(null, password);
    }

    @PutMapping("/{id}/exists-password")
    public ResponseEntity<Object> existsByIdNotAndPassword(@PathVariable("id") String id, @RequestBody String password) {
        return userService.existsByIdNotAndPassword(id, password);
    }

    @PutMapping("/exists-phone")
    public ResponseEntity<Object> existsByIdNotAndPhone(@RequestBody PhoneDTO phoneDTO) {
        return phoneService.existsIdNotAndPhone(null, phoneDTO);
    }

    @PutMapping("/{id}/exists-phone")
    public ResponseEntity<Object> existsByIdNotAndPhone(@PathVariable("id") String userId, @RequestBody PhoneDTO phoneDTO) {
        return phoneService.existsIdNotAndPhone(userId, phoneDTO);
    }

    @PutMapping("/exists-document")
    public ResponseEntity<Object> existsByIdNotAndDocument(@RequestBody Long document) {
        return dependentService.existsByIdNotAndDocument(null, document);
    }

    @PutMapping("/{id}/exists-document")
    public ResponseEntity<Object> existsByIdNotAndDocument(@PathVariable("id") String id, @RequestBody Long document) {
        return dependentService.existsByIdNotAndDocument(id, document);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable("id") String id, @RequestBody UserUpdateDTO userUpdateDTO) {
        return this.userService.update(id, userUpdateDTO);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") String id) {
        return this.userService.delete(id);
    }
}