package edu.oregonstate.engr.classwork.backend.repositories;

import edu.oregonstate.engr.classwork.backend.models.WorkOrderEmployee;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.SQLException;
import java.sql.Types;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class WorkOrderEmployeeRepository {
    private final JdbcClient jdbcClient;
    private final RowMapper<WorkOrderEmployee> rowMapper;

    @Autowired
    public WorkOrderEmployeeRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
        this.rowMapper = (rs, rowNum) -> {
            WorkOrderEmployee workOrderEmployee = new WorkOrderEmployee();
            workOrderEmployee.setWorkOrderID(rs.getInt("work_order_id"));
            workOrderEmployee.setEmployeeID(rs.getInt("employee_id"));
            workOrderEmployee.setAssignedAt(rs.getObject("assigned_at", LocalDateTime.class));

            // Set employee name if given
            try {
                workOrderEmployee.setEmployeeName(rs.getString("employee_name"));
            } catch (SQLException e) {
                //ignore and continue
            }
            return workOrderEmployee;
        };
    }

    public List<WorkOrderEmployee> getAll() {
        String sql = """
                SELECT
                woe.work_order_id,
                woe.employee_id,
                CONCAT(emp.first_name, ' ', emp.last_name) AS employee_name,
                woe.assigned_at
                FROM WorkOrderEmployees woe
                INNER JOIN Employees emp
                ON emp.employee_id = woe.employee_id;
               """;
        return jdbcClient.sql(sql).query(rowMapper).list();
    }

    public WorkOrderEmployee getByIds(int work_order_id, int employee_id) {
        String sql = """
                   SELECT * FROM WorkOrderEmployees
                   WHERE work_order_id = :work_order_id
                   AND employee_id = :employee_id;
                   """;
        return jdbcClient.sql(sql)
                .param("work_order_id", work_order_id)
                .param("employee_id", employee_id)
                .query(rowMapper).single();
    }

    private int getEmployeeIDFromName(String employeeName) {
        String sqlGetEmployeeID = """
                SELECT employee_id FROM Employees
                WHERE first_name = :first_name AND last_name = :last_name;
                """;
        String[] nameParts = employeeName.split(" ");
        String firstName = nameParts[0];
        String lastName = nameParts[1];
        return jdbcClient.sql(sqlGetEmployeeID)
                .param("first_name", firstName)
                .param("last_name", lastName)
                .query(Integer.class)
                .single();
    }

    public void insert(WorkOrderEmployee workOrderEmployee) {
        String sqlDuplicateCheck = """
                SELECT COUNT(*) FROM WorkOrderEmployees
                WHERE work_order_id = :work_order_id
                AND employee_id = :employee_id;
                """;
        int duplicate = jdbcClient.sql(sqlDuplicateCheck)
                .param("work_order_id", workOrderEmployee.getWorkOrderID())
                .param("employee_id", getEmployeeIDFromName(workOrderEmployee.getEmployeeName()))
                .param("assigned_at", workOrderEmployee.getAssignedAt(), Types.TIMESTAMP)
                .query(Integer.class)
                .single();

        if (duplicate > 0) {
            System.out.println("Duplicate Error");
            throw new DuplicateKeyException("Duplicate entry for WorkOrderEmployees");

        } else {
            String sqlInsert = """
                INSERT INTO WorkOrderEmployees (work_order_id, employee_id, assigned_at)
                VALUES (:work_order_id, :employee_id, :assigned_at);
                """;
            int employeeId = getEmployeeIDFromName(workOrderEmployee.getEmployeeName());
            workOrderEmployee.setEmployeeID(employeeId);
            jdbcClient.sql(sqlInsert)
                    .param("work_order_id", workOrderEmployee.getWorkOrderID())
                    .param("employee_id", workOrderEmployee.getEmployeeID())
                    .param("assigned_at", workOrderEmployee.getAssignedAt(), Types.TIMESTAMP)
                    .update();
        }
    }

    public void update(WorkOrderEmployee workOrderEmployee) {
        String sql = """
                UPDATE WorkOrderEmployees
                SET assigned_at = :assigned_at
                WHERE work_order_id = :work_order_id AND employee_id = :employee_id;
                """;
        int employeeId = getEmployeeIDFromName(workOrderEmployee.getEmployeeName());
        workOrderEmployee.setEmployeeID(employeeId);
        jdbcClient.sql(sql)
                .param("work_order_id", workOrderEmployee.getWorkOrderID())
                .param("employee_id", workOrderEmployee.getEmployeeID())
                .param("assigned_at", workOrderEmployee.getAssignedAt(), Types.TIMESTAMP)
                .update();
    }

    public void delete(WorkOrderEmployee workOrderEmployee) {
        String sql = """
            DELETE FROM WorkOrderEmployees
            WHERE work_order_id = :work_order_id AND employee_id = :employee_id;
            """;
        int employeeId = getEmployeeIDFromName(workOrderEmployee.getEmployeeName());
        workOrderEmployee.setEmployeeID(employeeId);
        jdbcClient.sql(sql)
                .param("work_order_id", workOrderEmployee.getWorkOrderID())
                .param("employee_id", workOrderEmployee.getEmployeeID())
                .update();
    }
}