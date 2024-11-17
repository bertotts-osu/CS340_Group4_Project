package edu.oregonstate.engr.classwork.backend.controllers;

import edu.oregonstate.engr.classwork.backend.models.WorkOrder;
import edu.oregonstate.engr.classwork.backend.services.WorkOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController//combines Controller + ResponseBody annotations
@RequestMapping("/work-orders")
@CrossOrigin(origins = {"http://classwork.engr.oregonstate.edu:14571", "http://localhost:14571"})
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
    public ResponseEntity<Void> createWorkOrder(@Validated @RequestBody WorkOrder workOrder) {
        workOrderService.createWorkOrder(workOrder);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Void> updateWorkOrder(@Validated @RequestBody WorkOrder workOrder) {
        workOrderService.updateWorkOrder(workOrder);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteWorkOrder(@RequestParam int work_order_id) {
        workOrderService.deleteWorkOrder(work_order_id);
        return ResponseEntity.noContent().build();
    }
}
