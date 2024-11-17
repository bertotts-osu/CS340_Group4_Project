package edu.oregonstate.engr.classwork.backend.services;

import edu.oregonstate.engr.classwork.backend.models.WorkOrderEmployee;
import edu.oregonstate.engr.classwork.backend.models.WorkOrderEmployee.WorkOrderEmployeeWithNames;
import edu.oregonstate.engr.classwork.backend.repositories.WorkOrderEmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkOrderEmployeeService {
    private final WorkOrderEmployeeRepository workOrderEmployeeRepository;

    public WorkOrderEmployeeService(WorkOrderEmployeeRepository workOrderEmployeeRepository) {
        this.workOrderEmployeeRepository = workOrderEmployeeRepository;
    }

    public List<WorkOrderEmployeeWithNames> getAllWorkOrderEmployees() {
        return workOrderEmployeeRepository.getAll();
    }

    public void createWorkOrderEmployee(WorkOrderEmployee workOrderEmployee) {
        workOrderEmployeeRepository.insert(workOrderEmployee);
    }

    public void updateWorkOrderEmployee(WorkOrderEmployee workOrderEmployee) {
        workOrderEmployeeRepository.update(workOrderEmployee);
    }

    public void deleteWorkOrderEmployee(int work_order_id, int employee_id) {
        workOrderEmployeeRepository.delete(work_order_id, employee_id);
    }
}