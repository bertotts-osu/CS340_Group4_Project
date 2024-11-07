package edu.oregonstate.engr.classwork.backend.repositories;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import edu.oregonstate.engr.classwork.backend.models.WorkOrder;

@Repository
public class WorkOrderRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public WorkOrderRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<WorkOrder> getAll() {
        String sql = "SELECT * FROM WorkOrders";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            WorkOrder rowObject = new WorkOrder();
            rowObject.setWork_order_id(rs.getInt("work_order_id"));
            rowObject.setSize(rs.getInt("size"));
            rowObject.setStreet(rs.getString("street"));
            rowObject.setCity(rs.getString("city"));
            rowObject.setZip(rs.getString("zip"));
            rowObject.setStage(rs.getString("stage"));
            rowObject.setApplied_at(rs.getString("applied_at"));
            rowObject.setEstimated_at(rs.getString("estimated_at"));
            rowObject.setScheduled_at(rs.getString("scheduled_at"));
            rowObject.setStarted_at(rs.getString("started_at"));
            rowObject.setCompleted_at(rs.getString("completed_at"));
            rowObject.setOn_hold_at(rs.getString("on_hold_at"));
            rowObject.setCanceled_at(rs.getString("canceled_at"));
            return rowObject;
        });
    }
}