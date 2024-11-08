package edu.oregonstate.engr.classwork.backend.repositories;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import edu.oregonstate.engr.classwork.backend.models.WorkOrder;

@Repository
public class WorkOrderRepository {
    private final JdbcTemplate jdbcTemplate;

    public WorkOrderRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<WorkOrder> getAll() {
        String sql = "SELECT * FROM WorkOrders";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            WorkOrder rowObject = new WorkOrder();
            rowObject.setWork_order_id(rs.getInt("work_order_id"));
            rowObject.setSize(rs.getString("size"));
            rowObject.setStreet(rs.getString("street"));
            rowObject.setCity(rs.getString("city"));
            rowObject.setState(rs.getString("state"));
            rowObject.setZip(rs.getString("zip"));
            rowObject.setStage(rs.getString("stage"));
            rowObject.setApplied_at(rs.getObject("applied_at", LocalDateTime.class));
            rowObject.setEstimated_at(rs.getObject("estimated_at", LocalDateTime.class));
            rowObject.setScheduled_at(rs.getObject("scheduled_at", LocalDateTime.class));
            rowObject.setStarted_at(rs.getObject("started_at", LocalDateTime.class));
            rowObject.setCompleted_at(rs.getObject("completed_at", LocalDateTime.class));
            rowObject.setOn_hold_at(rs.getObject("on_hold_at", LocalDateTime.class));
            rowObject.setCanceled_at(rs.getObject("canceled_at", LocalDateTime.class));
            return rowObject;
        });
    }
}