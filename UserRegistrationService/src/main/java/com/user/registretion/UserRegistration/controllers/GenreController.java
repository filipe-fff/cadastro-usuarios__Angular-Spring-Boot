package com.user.registretion.UserRegistration.controllers;

import com.user.registretion.UserRegistration.models.Genre;
import com.user.registretion.UserRegistration.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/genre")
public class GenreController {
    @Autowired
    GenreService genreService;

    @GetMapping
    public List<Genre> genresList() {
        return genreService.genresList();
    }
}