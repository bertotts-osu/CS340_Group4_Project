package edu.oregonstate.engr.classwork.backend.controllers;

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
