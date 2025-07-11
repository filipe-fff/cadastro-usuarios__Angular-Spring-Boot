package com.user.registretion.UserRegistration.controllers;

import com.user.registretion.UserRegistration.DTOs.UserSaveDTO;
import com.user.registretion.UserRegistration.DTOs.UserUpdateDTO;
import com.user.registretion.UserRegistration.models.User;
import com.user.registretion.UserRegistration.services.UserService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user-registration")
public class UserController {
    @Autowired
    UserService userService;

    // CREATE
    @PostMapping("/save")
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

    @PostMapping("/existsName")
    public boolean existsUserByName(@RequestBody String name) {
        return this.userService.existsByName(name);
    }

    @PostMapping("/existsEmail")
    public boolean existsUserByEmail(@RequestBody String email) {
        return this.userService.existsByEmail(email);
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