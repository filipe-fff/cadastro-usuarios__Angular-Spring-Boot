package com.user.registretion.UserRegistration;

import com.user.registretion.UserRegistration.models.User;
import com.user.registretion.UserRegistration.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class UserRegistrationApplicationTests {
    @Autowired
    UserService userService;

    @Test
    void usersListTest() {
        List<User> usersList = userService.findAll();
        usersList.forEach(System.out::println);
    }
}