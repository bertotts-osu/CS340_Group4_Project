package edu.oregonstate.engr.classwork.backend.services;

import edu.oregonstate.engr.classwork.backend.models.WorkOrderEmployee;
import edu.oregonstate.engr.classwork.backend.repositories.WorkOrderEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkOrderEmployeeService {
    private final WorkOrderEmployeeRepository workOrderEmployeeRepository;

    @Autowired
    public WorkOrderEmployeeService(WorkOrderEmployeeRepository workOrderEmployeeRepository) {
        this.workOrderEmployeeRepository = workOrderEmployeeRepository;
    }

    public List<WorkOrderEmployee> getAllWorkOrderEmployees() {
        return workOrderEmployeeRepository.getAll();
    }
}