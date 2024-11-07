package edu.oregonstate.engr.classwork.backend.controllers;

import edu.oregonstate.engr.classwork.backend.models.WorkOrderEmployee;
import edu.oregonstate.engr.classwork.backend.services.WorkOrderEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController//combines Controller + ResponseBody annotations
@RequestMapping("/work-order-employees")
public class WorkOrderEmployeeController {

    private final WorkOrderEmployeeService workOrderEmployeeService;

    @Autowired // constructor injection
    public WorkOrderEmployeeController(WorkOrderEmployeeService workOrderEmployeeService) {
        this.workOrderEmployeeService = workOrderEmployeeService;
    }

    @GetMapping
    @CrossOrigin(origins = "*") // enables requests to be sent from any origin
    public ResponseEntity<List<WorkOrderEmployee>> getAllWorkOrderEmployees() {
        List<WorkOrderEmployee> employees = workOrderEmployeeService.getAllWorkOrderEmployees();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(employees);
    }
}