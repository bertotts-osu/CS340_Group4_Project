package edu.oregonstate.engr.classwork.backend.controllers;

import edu.oregonstate.engr.classwork.backend.models.Employee;
import edu.oregonstate.engr.classwork.backend.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;


import java.util.List;

@RestController//combines Controller + ResponseBody annotations
@RequestMapping("/employees")
@CrossOrigin(origins={"http://classwork.engr.oregonstate.edu:14571", "http://localhost:14571"})
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired // constructor injection
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        Employee createdEmployee = employeeService.createEmployee(employee);
        return ResponseEntity.ok(createdEmployee);
    }

    @PutMapping
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee) {
        Employee updatedEmployee = employeeService.updateEmployee(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteEmployee(@RequestParam int employee_id) {
        employeeService.deleteEmployee(employee_id);
        return ResponseEntity.noContent().build();
    }
}
