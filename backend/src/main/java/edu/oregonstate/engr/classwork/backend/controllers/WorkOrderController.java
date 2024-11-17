package edu.oregonstate.engr.classwork.backend.controllers;

import edu.oregonstate.engr.classwork.backend.models.WorkOrder;
import edu.oregonstate.engr.classwork.backend.services.WorkOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController//combines Controller + ResponseBody annotations
@RequestMapping("/work-orders")
@CrossOrigin(origins={"http://classwork.engr.oregonstate.edu:14571", "http://localhost:14571"})
public class WorkOrderController {
    private final WorkOrderService workOrderService;

    public WorkOrderController(WorkOrderService workOrderService) {
        this.workOrderService = workOrderService;
    }

    @GetMapping
    public ResponseEntity<List<WorkOrder>> getAllWorkOrders() {
        List<WorkOrder> workOrders = workOrderService.getAllWorkOrders();
        return ResponseEntity.ok(workOrders);
    }

    @PostMapping
    public ResponseEntity<WorkOrder> createWorkOrder(@Validated @RequestBody WorkOrder workOrder) {
        WorkOrder createdWorkOrder = workOrderService.createWorkOrder(workOrder);
        return ResponseEntity.ok(createdWorkOrder);
    }

    @PutMapping
    public ResponseEntity<WorkOrder> updateWorkOrder(@RequestBody WorkOrder workOrder) {
        WorkOrder updatedWorkOrder = workOrderService.updateWorkOrder(workOrder);
        return ResponseEntity.ok(updatedWorkOrder);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteWorkOrder(@RequestParam int work_order_id) {
        workOrderService.deleteWorkOrder(work_order_id);
        return ResponseEntity.noContent().build();
    }
}
