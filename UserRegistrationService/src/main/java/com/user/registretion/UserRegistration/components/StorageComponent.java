package com.user.registretion.UserRegistration.components;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Component
public class StorageComponent {
    @Value("${storageUrl}")
    private String storageUrl;

    public String savePhoto(MultipartFile photo) {
        try {
            Path dir = Paths.get(storageUrl);

            String photoName = photo.getOriginalFilename();
            Path photoUrl = dir.resolve(photoName);

            Files.copy(photo.getInputStream(), photoUrl, StandardCopyOption.REPLACE_EXISTING);

            return photoUrl.getFileName().toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}