package edu.oregonstate.engr.classwork.backend.repositories;

import edu.oregonstate.engr.classwork.backend.models.PurchaseOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PurchaseOrderRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PurchaseOrderRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<PurchaseOrder> getAll() {
        String sql = "SELECT * FROM PurchaseOrders";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            PurchaseOrder rowObject = new PurchaseOrder();
            rowObject.setPurchase_order_id(rs.getInt("purchase_order_id"));
            rowObject.setCreated_at(rs.getString("created_at"));
            rowObject.setEmployee_id(rs.getInt("employee_id"));
            rowObject.setWork_order_id(rs.getInt("work_order_id"));
            if (rs.wasNull()) rowObject.setWork_order_id(null);
            return rowObject;
        });
    }
}