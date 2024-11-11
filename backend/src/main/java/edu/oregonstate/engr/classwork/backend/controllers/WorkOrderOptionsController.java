package edu.oregonstate.engr.classwork.backend.controllers;

import edu.oregonstate.engr.classwork.backend.repositories.WorkOrderOptionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/work-order-list")
public class WorkOrderOptionsController {

    private final WorkOrderOptionsRepository workOrderOptionsRepository;

    @Autowired //constructor injection
    public WorkOrderOptionsController(WorkOrderOptionsRepository workOrderOptionsRepository) {
        this.workOrderOptionsRepository = workOrderOptionsRepository;
    }

    @GetMapping // maps HTTP GET requests to method
    @CrossOrigin(origins = "*") // enables requests to be sent from any origin
    public ResponseEntity<List<String>> getWorkOrderOptions() {
        List<String> workOrders = workOrderOptionsRepository.getWorkOrders();
        return ResponseEntity.ok(workOrders);
    }
}