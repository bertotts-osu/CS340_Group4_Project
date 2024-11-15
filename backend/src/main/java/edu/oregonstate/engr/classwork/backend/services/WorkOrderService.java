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

    public WorkOrder createWorkOrder(WorkOrder workOrder) {
        int work_order_id = workOrderRepository.insert(workOrder);
        return workOrderRepository.getById(work_order_id);
    }

    public WorkOrder updateWorkOrder(WorkOrder workOrder) {
        workOrderRepository.update(workOrder);
        return workOrderRepository.getById(workOrder.getWork_order_id());
    }

    public void deleteWorkOrder(int work_order_id) {
        workOrderRepository.delete(work_order_id);
    }
}