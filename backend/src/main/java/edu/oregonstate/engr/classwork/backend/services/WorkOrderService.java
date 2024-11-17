package edu.oregonstate.engr.classwork.backend.services;

import edu.oregonstate.engr.classwork.backend.models.WorkOrder;
import edu.oregonstate.engr.classwork.backend.repositories.WorkOrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkOrderService {
    private final WorkOrderRepository workOrderRepository;

    public WorkOrderService(WorkOrderRepository workOrderRepository) {
        this.workOrderRepository = workOrderRepository;
    }

    public List<WorkOrder> getAllWorkOrders() {
        return workOrderRepository.getAll();
    }

    public void createWorkOrder(WorkOrder workOrder) {
        workOrderRepository.insert(workOrder);
    }

    public void updateWorkOrder(WorkOrder workOrder) {
        workOrderRepository.update(workOrder);
    }

    public void deleteWorkOrder(int work_order_id) {
        workOrderRepository.delete(work_order_id);
    }
}