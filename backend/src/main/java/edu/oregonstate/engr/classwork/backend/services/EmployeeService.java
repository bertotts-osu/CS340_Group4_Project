package edu.oregonstate.engr.classwork.backend.services;

import edu.oregonstate.engr.classwork.backend.models.Employee;
import edu.oregonstate.engr.classwork.backend.repositories.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository employeesRepository;

    public EmployeeService(EmployeeRepository employeesRepository) {
        this.employeesRepository = employeesRepository;
    }

    public List<Employee> getAllEmployees() {
        return employeesRepository.getAll();
    }

    public void createEmployee(Employee employee) {
        employeesRepository.insert(employee);
    }

    public void updateEmployee(Employee employee) {
        employeesRepository.update(employee);
    }

    public void deleteEmployee(int employee_id) {
        employeesRepository.delete(employee_id);
    }
}