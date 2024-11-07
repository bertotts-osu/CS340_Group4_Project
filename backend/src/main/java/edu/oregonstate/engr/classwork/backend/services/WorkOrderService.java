package edu.oregonstate.engr.classwork.backend.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import edu.oregonstate.engr.classwork.backend.models.WorkOrder;
import edu.oregonstate.engr.classwork.backend.repositories.WorkOrderRepository;

@Service
public class WorkOrderService {
    private final WorkOrderRepository workOrderRepository;

    @Autowired
    public WorkOrderService(WorkOrderRepository workOrderRepository) {
        this.workOrderRepository = workOrderRepository;
    }

    public List<WorkOrder> getAllWorkOrders() {
        return workOrderRepository.getAll();
    }
}