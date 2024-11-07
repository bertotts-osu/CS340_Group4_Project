package edu.oregonstate.engr.classwork.backend.repositories;

import edu.oregonstate.engr.classwork.backend.models.PurchaseOrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PurchaseOrderItemRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PurchaseOrderItemRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<PurchaseOrderItem> getAll() {
        String sql = "SELECT * FROM PurchaseOrderItems";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            PurchaseOrderItem rowObject = new PurchaseOrderItem();
            rowObject.setPurchase_order_item_id(rs.getInt("purchase_order_item_id"));
            rowObject.setUnit_cost(rs.getBigDecimal("unit_cost"));
            rowObject.setQuantity(rs.getInt("quantity"));
            rowObject.setEstimated_delivery_date(rs.getString("estimated_delivery_date"));
            rowObject.setDelivery_type(rs.getString("delivery_type"));
            rowObject.setPurchase_order_id(rs.getInt("purchase_order_id"));
            rowObject.setMaterial_id(rs.getInt("material_id"));
            return rowObject;
        });
    }
}