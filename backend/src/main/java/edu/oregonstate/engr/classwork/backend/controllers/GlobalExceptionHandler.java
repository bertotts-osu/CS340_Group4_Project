package edu.oregonstate.engr.classwork.backend.controllers;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler
    public ProblemDetail handleAllNonSpring(Exception ex) {
        return ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler
    public ProblemDetail handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.UNPROCESSABLE_ENTITY, "Invalid Entry state");
    }

    @ExceptionHandler
    public ProblemDetail handleDuplicateKey(DuplicateKeyException ex) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, "Entry already exists");
    }

    @ExceptionHandler
    public ProblemDetail handleIncorrectResultSize(IncorrectResultSizeDataAccessException ex) {
        if (ex.getExpectedSize() == 1 && ex.getActualSize() == 0) {
            return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, "Entry doesn't exist");
        }
        throw ex;
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        ResponseEntity<Object> responseEntity = super.handleMethodArgumentNotValid(ex, headers, status, request);
        if (responseEntity.getBody() instanceof ProblemDetail problemDetail) {
            List<String> fieldErrors = ex.getBindingResult().getFieldErrors().stream()
                    .map(fe -> String.format("%s %s", fe.getField(), fe.getDefaultMessage()))
                    .toList();
            problemDetail.setProperty("field_errors", fieldErrors);
        }
        return responseEntity;
    }
}
