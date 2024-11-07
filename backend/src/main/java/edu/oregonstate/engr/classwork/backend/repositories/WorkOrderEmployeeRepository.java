package edu.oregonstate.engr.classwork.backend.repositories;

import edu.oregonstate.engr.classwork.backend.models.WorkOrderEmployee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class WorkOrderEmployeeRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public WorkOrderEmployeeRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<WorkOrderEmployee> getAll() {
        String sql = "SELECT * FROM WorkOrderEmployees";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            WorkOrderEmployee rowObject = new WorkOrderEmployee();
            rowObject.setEmployee_id(rs.getInt("employee_id"));
            rowObject.setWork_order_id(rs.getInt("work_order_id"));
            return rowObject;
        });
    }
}