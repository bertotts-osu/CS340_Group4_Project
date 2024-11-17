package edu.oregonstate.engr.classwork.backend.controllers;

import edu.oregonstate.engr.classwork.backend.models.WorkOrderEmployee;
import edu.oregonstate.engr.classwork.backend.models.WorkOrderEmployee.WorkOrderEmployeeWithNames;
import edu.oregonstate.engr.classwork.backend.services.WorkOrderEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController//combines Controller + ResponseBody annotations
@RequestMapping("/work-order-employees")
@CrossOrigin(origins={"http://classwork.engr.oregonstate.edu:14571", "http://localhost:14571"})
public class WorkOrderEmployeeController {
    private final WorkOrderEmployeeService workOrderEmployeeService;

    public WorkOrderEmployeeController(WorkOrderEmployeeService workOrderEmployeeService) {
        this.workOrderEmployeeService = workOrderEmployeeService;
    }

    @GetMapping
    public ResponseEntity<List<WorkOrderEmployeeWithNames>> getAllWorkOrderEmployees() {
        List<WorkOrderEmployeeWithNames> workOrderEmployees = workOrderEmployeeService.getAllWorkOrderEmployees();
        return ResponseEntity.ok(workOrderEmployees);
    }

    @PostMapping
    public ResponseEntity<Void> createWorkOrderEmployee(@Validated @RequestBody WorkOrderEmployee workOrderEmployee) {
        workOrderEmployeeService.createWorkOrderEmployee(workOrderEmployee);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Void> updateWorkOrderEmployee(@Validated @RequestBody WorkOrderEmployee workOrderEmployee) {
        workOrderEmployeeService.updateWorkOrderEmployee(workOrderEmployee);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteWorkOrderEmployee(@RequestParam int work_order_id, @RequestParam int employee_id) {
        workOrderEmployeeService.deleteWorkOrderEmployee(work_order_id, employee_id);
        return ResponseEntity.noContent().build();
    }
}