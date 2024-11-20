package edu.oregonstate.engr.classwork.backend.repositories;

import edu.oregonstate.engr.classwork.backend.models.WorkOrder;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Types;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class WorkOrderRepository {
    private final JdbcClient jdbcClient;
    private final RowMapper<WorkOrder> rowMapper;

    public WorkOrderRepository(DataSource dataSource) {
        this.jdbcClient = JdbcClient.create(dataSource);
        this.rowMapper = (rs, rowNum) -> {
            WorkOrder workOrder = new WorkOrder();
            workOrder.setWork_order_id(rs.getInt("work_order_id"));
            workOrder.setSize(WorkOrder.Size.valueOf(rs.getString("size")));
            workOrder.setStreet(rs.getString("street"));
            workOrder.setCity(rs.getString("city"));
            workOrder.setState(WorkOrder.State.valueOf(rs.getString("state")));
            workOrder.setZip(rs.getString("zip"));
            workOrder.setStage(WorkOrder.Stage.valueOf(rs.getString("stage").replace(" ", "_")));
            workOrder.setApplied_at(rs.getObject("applied_at", LocalDateTime.class));
            workOrder.setEstimated_at(rs.getObject("estimated_at", LocalDateTime.class));
            workOrder.setScheduled_at(rs.getObject("scheduled_at", LocalDateTime.class));
            workOrder.setStarted_at(rs.getObject("started_at", LocalDateTime.class));
            workOrder.setCompleted_at(rs.getObject("completed_at", LocalDateTime.class));
            workOrder.setOn_hold_at(rs.getObject("on_hold_at", LocalDateTime.class));
            workOrder.setCanceled_at(rs.getObject("canceled_at", LocalDateTime.class));
            return workOrder;
        };
    }

    public List<WorkOrder> getAll() {
        String sql = "SELECT * FROM WorkOrders;";
        return jdbcClient.sql(sql).query(rowMapper).list();
    }

    public int insert(WorkOrder workOrder) {
        String sql = """
                INSERT INTO WorkOrders (size, street, city, state, zip, stage, applied_at, estimated_at, scheduled_at, started_at, completed_at, on_hold_at, canceled_at)
                VALUES (:size, :street, :city, :state, :zip, :stage, :applied_at, :estimated_at, :scheduled_at, :started_at, :completed_at, :on_hold_at, :canceled_at);
                """;
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcClient.sql(sql)
                .param("size", workOrder.getSize().toString())
                .param("street", workOrder.getStreet())
                .param("city", workOrder.getCity())
                .param("state", workOrder.getState().toString())
                .param("zip", workOrder.getZip())
                .param("stage", workOrder.getStage().toString().replace("_", " "))
                .param("applied_at", workOrder.getApplied_at(), Types.TIMESTAMP)
                .param("estimated_at", workOrder.getEstimated_at(), Types.TIMESTAMP)
                .param("scheduled_at", workOrder.getScheduled_at(), Types.TIMESTAMP)
                .param("started_at", workOrder.getStarted_at(), Types.TIMESTAMP)
                .param("completed_at", workOrder.getCompleted_at(), Types.TIMESTAMP)
                .param("on_hold_at", workOrder.getOn_hold_at(), Types.TIMESTAMP)
                .param("canceled_at", workOrder.getCanceled_at(), Types.TIMESTAMP)
                .update(keyHolder);
        return keyHolder.getKey().intValue();
    }

    public void update(WorkOrder workOrder) {
        String sql = """
            UPDATE WorkOrders
            SET size = :size, street = :street, city = :city, state = :state, zip = :zip, stage = :stage,
                applied_at = :applied_at, estimated_at = :estimated_at, scheduled_at = :scheduled_at,
                started_at = :started_at, completed_at = :completed_at, on_hold_at = :on_hold_at, canceled_at = :canceled_at
            WHERE work_order_id = :work_order_id;
            """;
        int updatedRows = jdbcClient.sql(sql)
                .param("size", workOrder.getSize().toString())
                .param("street", workOrder.getStreet())
                .param("city", workOrder.getCity())
                .param("state", workOrder.getState().toString())
                .param("zip", workOrder.getZip())
                .param("stage", workOrder.getStage().toString().replace("_", " "))
                .param("applied_at", workOrder.getApplied_at(), Types.TIMESTAMP)
                .param("estimated_at", workOrder.getEstimated_at(), Types.TIMESTAMP)
                .param("scheduled_at", workOrder.getScheduled_at(), Types.TIMESTAMP)
                .param("started_at", workOrder.getStarted_at(), Types.TIMESTAMP)
                .param("completed_at", workOrder.getCompleted_at(), Types.TIMESTAMP)
                .param("on_hold_at", workOrder.getOn_hold_at(), Types.TIMESTAMP)
                .param("canceled_at", workOrder.getCanceled_at(), Types.TIMESTAMP)
                .param("work_order_id", workOrder.getWork_order_id())
                .update();
        if (updatedRows == 0) throw new IncorrectResultSizeDataAccessException(1, 0);
    }

    public void delete(int work_order_id) {
        String sql = """
                DELETE FROM WorkOrders
                WHERE work_order_id = :work_order_id;
                """;
        jdbcClient.sql(sql)
                .param("work_order_id", work_order_id)
                .update();
    }
}