package com.user.registretion.UserRegistration.services;

import com.user.registretion.UserRegistration.models.User;
import com.user.registretion.UserRegistration.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    public UserRepository userRepository;

    public List<User> getUser() {
        return userRepository.findAll();
    }
}