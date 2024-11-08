package edu.oregonstate.engr.classwork.backend.repositories;

import edu.oregonstate.engr.classwork.backend.models.Employee;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class EmployeeRepository {
    private final JdbcClient jdbcClient;
    private final RowMapper<Employee> rowMapper;

    public EmployeeRepository(DataSource dataSource) {
        this.jdbcClient = JdbcClient.create(dataSource);

        this.rowMapper = (rs, rowNum) -> {
            Employee employee = new Employee();
            employee.setEmployee_id(rs.getInt("employee_id"));
            employee.setFirst_name(rs.getString("first_name"));
            employee.setLast_name(rs.getString("last_name"));
            employee.setEmail(rs.getString("email"));
            employee.setPhone_number(rs.getString("phone_number"));
            employee.setStatus(Employee.Status.valueOf(rs.getString("status")));
            employee.setSkill_level(Employee.SkillLevel.valueOf(rs.getString("skill_level")));
            return employee;
        };
    }

    public List<Employee> getAll() {
        String sql = "SELECT * FROM Employees;";
        return jdbcClient.sql(sql).query(rowMapper).list();
    }

    public Employee getById(int employee_id) {
        String sql = "SELECT * FROM Employees WHERE employee_id = :employee_id;";
        return jdbcClient.sql(sql).param("employee_id", employee_id).query(rowMapper).single();
    }

    public int insert(Employee employee) {
        String sql = """
                INSERT INTO Employees (first_name, last_name, email, phone_number, status, skill_level)
                VALUES (:first_name, :last_name, :email, :phone_number, :status, :skill_level);
                """;
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcClient.sql(sql)
                .param("first_name", employee.getFirst_name())
                .param("last_name", employee.getLast_name())
                .param("email", employee.getEmail())
                .param("phone_number", employee.getPhone_number())
                .param("status", employee.getStatus().toString())
                .param("skill_level", employee.getSkill_level().toString())
                .update(keyHolder);
        return keyHolder.getKey().intValue();
    }
}