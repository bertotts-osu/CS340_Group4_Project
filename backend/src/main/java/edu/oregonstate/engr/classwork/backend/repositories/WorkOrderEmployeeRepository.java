package edu.oregonstate.engr.classwork.backend.repositories;

import edu.oregonstate.engr.classwork.backend.models.WorkOrderEmployee;
import edu.oregonstate.engr.classwork.backend.models.WorkOrderEmployee.WorkOrderEmployeeWithNames;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Types;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class WorkOrderEmployeeRepository {
    private final JdbcClient jdbcClient;
    private final RowMapper<WorkOrderEmployeeWithNames> rowMapper;

    public WorkOrderEmployeeRepository(DataSource dataSource) {
        this.jdbcClient = JdbcClient.create(dataSource);
        this.rowMapper = (rs, rowNum) -> {
            WorkOrderEmployeeWithNames workOrderEmployee = new WorkOrderEmployeeWithNames();
            workOrderEmployee.setWork_order_id(rs.getInt("work_order_id"));
            workOrderEmployee.setEmployee_id(rs.getInt("employee_id"));
            workOrderEmployee.setAssigned_at(rs.getObject("assigned_at", LocalDateTime.class));
            String first_name = rs.getString("first_name");
            String last_name = rs.getString("last_name");
            workOrderEmployee.setEmployee_name(first_name + " " + last_name);
            return workOrderEmployee;
        };
    }

    public List<WorkOrderEmployeeWithNames> getAll() {
        String sql = """
                SELECT WorkOrderEmployees.*, Employees.first_name, Employees.last_name
                FROM WorkOrderEmployees INNER JOIN Employees ON WorkOrderEmployees.employee_id = Employees.employee_id;
                """;
        return jdbcClient.sql(sql).query(rowMapper).list();
    }

    public void insert(WorkOrderEmployee workOrderEmployee) {
        String sql = """
                INSERT INTO WorkOrderEmployees (work_order_id, employee_id, assigned_at)
                VALUES (:work_order_id, :employee_id, :assigned_at);
                """;
        jdbcClient.sql(sql)
                .param("work_order_id", workOrderEmployee.getWork_order_id())
                .param("employee_id", workOrderEmployee.getEmployee_id())
                .param("assigned_at", workOrderEmployee.getAssigned_at(), Types.TIMESTAMP)
                .update();
    }

    public void update(WorkOrderEmployee workOrderEmployee) {
        String sql = """
                UPDATE WorkOrderEmployees
                SET assigned_at = :assigned_at
                WHERE work_order_id = :work_order_id AND employee_id = :employee_id;
                """;
        int updatedRows = jdbcClient.sql(sql)
                .param("assigned_at", workOrderEmployee.getAssigned_at(), Types.TIMESTAMP)
                .param("work_order_id", workOrderEmployee.getWork_order_id())
                .param("employee_id", workOrderEmployee.getEmployee_id())
                .update();
        if (updatedRows == 0) throw new IncorrectResultSizeDataAccessException(1, 0);
    }

    public void delete(int work_order_id, int employee_id) {
        String sql = """
                DELETE FROM WorkOrderEmployees
                WHERE work_order_id = :work_order_id AND employee_id = :employee_id;
                """;
        jdbcClient.sql(sql)
                .param("work_order_id", work_order_id)
                .param("employee_id", employee_id)
                .update();
    }
}