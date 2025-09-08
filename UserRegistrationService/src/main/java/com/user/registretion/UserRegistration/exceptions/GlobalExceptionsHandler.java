package com.user.registretion.UserRegistration.exceptions;

import com.user.registretion.UserRegistration.controllers.dtos.ResponseError;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionsHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ResponseError> handleConstraintViolation(DataIntegrityViolationException e) {
        var errorDTO = ResponseError.conflict("Value already exists for a unique field.");
        return ResponseEntity
                .status(errorDTO.status())
                .body(errorDTO);
    }
}