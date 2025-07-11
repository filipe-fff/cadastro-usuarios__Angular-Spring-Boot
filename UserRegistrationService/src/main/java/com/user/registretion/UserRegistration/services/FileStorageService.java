package com.user.registretion.UserRegistration.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    private final String uploadDir = "uploads/";

    public String save(MultipartFile photo) throws IOException {
        try {
            File directory = new File(this.uploadDir);
            if (!directory.exists()) directory.mkdirs();

            String fileName = UUID.randomUUID().toString() + "-" + photo.getOriginalFilename();
            Path filepath = Paths.get(this.uploadDir, fileName);
            Files.copy(photo.getInputStream(), filepath, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/" + fileName;
        } catch (IOException e) {
            System.err.println("Erro ao salvar o arquivo" + e.getMessage());
            throw e;
        }
    }
}