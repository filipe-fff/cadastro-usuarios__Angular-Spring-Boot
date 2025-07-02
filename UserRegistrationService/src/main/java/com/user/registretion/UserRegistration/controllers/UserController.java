package com.user.registretion.UserRegistration.controllers;

import com.user.registretion.UserRegistration.models.*;
import com.user.registretion.UserRegistration.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PhoneRepository phoneRepository;

    @Autowired
    AddressRepository addressRepository;

    @Autowired
    DependentRepository dependentRepository;

    @Autowired
    MusicRepository musicRepository;

    @Autowired
    GenreRepository genreRepository;

    @GetMapping
    public List<User> usersList() {
        return userRepository.findAll();
    }

    @GetMapping("/phone")
    public List<Phone> phoneList() {
        return phoneRepository.findAll();
    }

    @GetMapping("/address")
    public List<Address> addressList() {
        return addressRepository.findAll();
    }

    @GetMapping("/dependents")
    public List<Dependent> dependentList() {
        return dependentRepository.findAll();
    }

    @GetMapping("/musics")
    public List<Music> musicsList() {
        return musicRepository.findAll();
    }

    @GetMapping("/genres")
    public List<Genre> genresList() {
        return genreRepository.findAll();
    }
}