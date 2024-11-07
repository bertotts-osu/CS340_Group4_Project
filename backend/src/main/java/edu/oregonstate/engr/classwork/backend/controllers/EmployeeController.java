package edu.oregonstate.engr.classwork.backend.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.oregonstate.engr.classwork.backend.models.Employee;
import edu.oregonstate.engr.classwork.backend.services.EmployeeService;

@RestController//combines Controller + ResponseBody annotations
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired // constructor injection
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    @CrossOrigin(origins = "*") // enables requests to be sent from any origin
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(employees);
    }
}
