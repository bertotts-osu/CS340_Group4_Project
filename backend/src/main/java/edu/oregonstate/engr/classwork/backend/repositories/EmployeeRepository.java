package edu.oregonstate.engr.classwork.backend.repositories;

import edu.oregonstate.engr.classwork.backend.models.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EmployeeRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public EmployeeRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Employee> getAll() {
        String sql = "SELECT * FROM Employees";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Employee rowObject = new Employee();
            rowObject.setEmployee_id(rs.getInt("employee_id"));
            rowObject.setFirst_name(rs.getString("first_name"));
            rowObject.setLast_name(rs.getString("last_name"));
            rowObject.setEmail(rs.getString("email"));
            rowObject.setPhone_number(rs.getString("phone_number"));
            rowObject.setStatus(rs.getString("status"));
            rowObject.setSkill_level(rs.getString("skill_level"));
            return rowObject;
        });
    }
}