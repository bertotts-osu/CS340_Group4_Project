package edu.oregonstate.engr.classwork.backend.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.oregonstate.engr.classwork.backend.models.WorkOrder;
import edu.oregonstate.engr.classwork.backend.services.WorkOrderService;

@RestController//combines Controller + ResponseBody annotations
@RequestMapping("/work-orders")
public class WorkOrderController {

    private final WorkOrderService workOrderService;

    @Autowired // constructor injection
    public WorkOrderController(WorkOrderService workOrderService) {
        this.workOrderService = workOrderService;
    }

    @GetMapping
    @CrossOrigin(origins = "*") // enables requests to be sent from any origin
    public ResponseEntity<List<WorkOrder>> getAllWorkOrders() {
        List<WorkOrder> workOrders = workOrderService.getAllWorkOrders();
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(workOrders);
    }
}
