package edu.oregonstate.engr.classwork.backend.controllers;

import edu.oregonstate.engr.classwork.backend.models.WorkOrderEmployee;
import edu.oregonstate.engr.classwork.backend.services.WorkOrderEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController//combines Controller + ResponseBody annotations
@RequestMapping("/work-order-employees")
@CrossOrigin(origins = "*") // enables requests to be sent from any origin
public class WorkOrderEmployeeController {

    private final WorkOrderEmployeeService workOrderEmployeeService;

    @Autowired // constructor injection
    public WorkOrderEmployeeController(WorkOrderEmployeeService workOrderEmployeeService) {
        this.workOrderEmployeeService = workOrderEmployeeService;
    }

    @GetMapping
    public ResponseEntity<List<WorkOrderEmployee>> getAllWorkOrderEmployees() {
        List<WorkOrderEmployee> employees = workOrderEmployeeService.getAllWorkOrderEmployees();
        return ResponseEntity.ok(employees);
    }

    @PostMapping
    }

    @PutMapping
    public ResponseEntity<WorkOrderEmployee> updateWorkOrderEmployee(@Validated @RequestBody WorkOrderEmployee workOrderEmployee) {
        WorkOrderEmployee updatedWorkOrderEmployee = workOrderEmployeeService.updateWorkOrderEmployee(workOrderEmployee);
        return ResponseEntity.ok(updatedWorkOrderEmployee);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteWorkOrderEmployee(@RequestParam int work_order_id, @RequestParam int employee_id) {
        workOrderEmployeeService.deleteWorkOrderEmployee(work_order_id, employee_id);
        return ResponseEntity.noContent().build();
    }
}