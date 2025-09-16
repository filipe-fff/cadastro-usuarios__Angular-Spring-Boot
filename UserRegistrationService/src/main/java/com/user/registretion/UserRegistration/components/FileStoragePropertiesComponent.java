package com.user.registretion.UserRegistration.components;

import com.user.registretion.UserRegistration.config.FileStoragePropertiesConfig;
import com.user.registretion.UserRegistration.models.User;
import org.apache.coyote.BadRequestException;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import java.util.function.Consumer;

@Component
public class FileStoragePropertiesComponent {

    private final Path fileStorageLocation;

    public FileStoragePropertiesComponent(FileStoragePropertiesConfig fileStoragePropertiesConfig) {
        this.fileStorageLocation = Paths.get(fileStoragePropertiesConfig.getUploadDir())
                .toAbsolutePath().normalize();
    }

    public void save(UUID userId, MultipartFile file, Consumer<String> photoUri) throws IOException {
        if (!file.isEmpty()) {
            String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());

            int i = originalFileName.lastIndexOf(".");
            String extension = "";
            if (i > 0) {
                extension = originalFileName.substring(i);
            }

            String fileName = userId + extension;

            Path filePath = fileStorageLocation.resolve(fileName);
            file.transferTo(filePath);

            photoUri.accept( userId.toString() + extension);
        }
    }

    public UrlResource getFile(String fileName) throws MalformedURLException {
        Path filePath = fileStorageLocation.resolve(fileName).normalize();
        return new UrlResource(filePath.toUri());
    }

    public void delete(String fileName) throws IOException {
        if (fileName != null && !fileName.isEmpty()) {
            Path filePath = fileStorageLocation.resolve(fileName).normalize();
            Files.delete(filePath);
        }
    }
}