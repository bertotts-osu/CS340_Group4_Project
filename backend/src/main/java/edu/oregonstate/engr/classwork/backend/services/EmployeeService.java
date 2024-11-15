package edu.oregonstate.engr.classwork.backend.services;

import edu.oregonstate.engr.classwork.backend.models.Employee;
import edu.oregonstate.engr.classwork.backend.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository employeesRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeesRepository) {
        this.employeesRepository = employeesRepository;
    }

    public List<Employee> getAllEmployees() {
        return employeesRepository.getAll();
    }

    public Employee createEmployee(Employee employee) {
        int employee_id = employeesRepository.insert(employee);
        return employeesRepository.getById(employee_id);
    }

    public Employee updateEmployee(Employee employee) {
        employeesRepository.update(employee);
        return employeesRepository.getById(employee.getEmployee_id());
    }

    public void deleteEmployee(int employee_id) {
        employeesRepository.delete(employee_id);
    }
}