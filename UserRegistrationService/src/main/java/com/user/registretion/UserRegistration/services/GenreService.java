package com.user.registretion.UserRegistration.services;

import com.user.registretion.UserRegistration.models.Genre;
import com.user.registretion.UserRegistration.repositories.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreService {
    @Autowired
    private GenreRepository genreRepository;

    public List<Genre> genresList() {
        return this.genreRepository.findAll();
    }
}