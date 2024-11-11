package edu.oregonstate.engr.classwork.backend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EmployeeNameOptionsRepository {
    private final JdbcClient jdbcClient;

    @Autowired
    public EmployeeNameOptionsRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<String> getEmployeeNames() {
        String query = """
            SELECT CONCAT(first_name, ' ', last_name) AS employee_name
            FROM Employees;
            """;
        return jdbcClient.sql(query).query((rs, rowNum) -> rs.getString("employee_name")).list();
    }
}