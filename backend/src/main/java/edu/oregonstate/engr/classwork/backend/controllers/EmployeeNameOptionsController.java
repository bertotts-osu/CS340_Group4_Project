package edu.oregonstate.engr.classwork.backend.controllers;

import edu.oregonstate.engr.classwork.backend.repositories.EmployeeNameOptionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/employee-names")
public class EmployeeNameOptionsController {

    private final EmployeeNameOptionsRepository employeeNameOptionsRepository;

    @Autowired //constructor injection
    public EmployeeNameOptionsController(EmployeeNameOptionsRepository employeeNameOptionsRepository) {
        this.employeeNameOptionsRepository = employeeNameOptionsRepository;
    }

    @GetMapping // maps HTTP GET requests to method
    @CrossOrigin(origins = "*") // enables requests to be sent from any origin
    public ResponseEntity<List<String>> getEmployeeNameOptions() {
        List<String> employees = employeeNameOptionsRepository.getEmployeeNames();
        return ResponseEntity.ok(employees);
    }
}