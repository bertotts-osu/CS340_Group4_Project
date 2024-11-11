package edu.oregonstate.engr.classwork.backend.controllers;

import edu.oregonstate.engr.classwork.backend.models.WorkOrderEmployee;
import edu.oregonstate.engr.classwork.backend.services.WorkOrderEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.View;

import java.util.ArrayList;
import java.util.List;

@RestController//combines Controller + ResponseBody annotations
@RequestMapping("/work-order-employees")
@CrossOrigin(origins = "*") // enables requests to be sent from any origin
public class WorkOrderEmployeeController {

    private final WorkOrderEmployeeService workOrderEmployeeService;

    @Autowired // constructor injection
    public WorkOrderEmployeeController(WorkOrderEmployeeService workOrderEmployeeService, View error) {
        this.workOrderEmployeeService = workOrderEmployeeService;
    }

    @GetMapping
    public ResponseEntity<List<WorkOrderEmployee>> getAllWorkOrderEmployees() {
        List<WorkOrderEmployee> employees = workOrderEmployeeService.getAllWorkOrderEmployees();
        return ResponseEntity.ok(employees);
    }

    @PostMapping
    public ResponseEntity<?> createWorkOrderEmployee(@RequestBody WorkOrderEmployee workOrderEmployee) {
        try {
            WorkOrderEmployee createdWorkOrderEmployee = workOrderEmployeeService.createWorkOrderEmployee(workOrderEmployee);
            return ResponseEntity.ok(createdWorkOrderEmployee);
        } catch (DuplicateKeyException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
        } catch (DataIntegrityViolationException ex) {
            String errorMessage = parseErrorMessage(ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("A required field is missing or invalid." + errorMessage);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    private String parseErrorMessage(String errorMessage) {
        if (errorMessage.contains("Column 'assigned_at' cannot be null")) {
            return "' Assigned At' cannot be null";
        }
        return "unknown field";
    }

    @PutMapping
    public ResponseEntity<List<WorkOrderEmployee>> updateWorkOrderEmployees(@RequestBody List<WorkOrderEmployee> workOrderEmployees) {
        List<WorkOrderEmployee> updatedWorkOrderEmployees = new ArrayList<>();
        for (WorkOrderEmployee workOrderEmployee : workOrderEmployees) {
            WorkOrderEmployee updatedWorkOrderEmployee = workOrderEmployeeService.updateWorkOrderEmployee(workOrderEmployee);
            updatedWorkOrderEmployees.add(updatedWorkOrderEmployee);
        }
        return ResponseEntity.ok(updatedWorkOrderEmployees);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteWorkOrderEmployees(@RequestBody List<WorkOrderEmployee> workOrderEmployees) {
        for (WorkOrderEmployee workOrderEmployee : workOrderEmployees) {
            workOrderEmployeeService.deleteWorkOrderEmployee(workOrderEmployee);
        }
        return ResponseEntity.noContent().build();
    }
}