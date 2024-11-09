package edu.oregonstate.engr.classwork.backend.repositories;

import edu.oregonstate.engr.classwork.backend.models.WorkOrderEmployee;
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
    private final RowMapper<WorkOrderEmployee> rowMapper;

    public WorkOrderEmployeeRepository(DataSource dataSource) {
        this.jdbcClient = JdbcClient.create(dataSource);

        this.rowMapper = (rs, rowNum) -> {
            WorkOrderEmployee workOrderEmployee = new WorkOrderEmployee();
            workOrderEmployee.setWork_order_id(rs.getInt("work_order_id"));
            workOrderEmployee.setEmployee_id(rs.getInt("employee_id"));
            workOrderEmployee.setAssigned_at(rs.getObject("assigned_at", LocalDateTime.class));
            return workOrderEmployee;
        };
    }

    public List<WorkOrderEmployee> getAll() {
        String sql = "SELECT * FROM WorkOrderEmployees;";
        return jdbcClient.sql(sql).query(rowMapper).list();
    }

    public WorkOrderEmployee getByIds(int work_order_id, int employee_id) {
        String sql = "SELECT * FROM WorkOrderEmployees WHERE work_order_id = :work_order_id AND employee_id = :employee_id;";
        return jdbcClient.sql(sql)
                .param("work_order_id", work_order_id)
                .param("employee_id", employee_id)
                .query(rowMapper).single();
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
}