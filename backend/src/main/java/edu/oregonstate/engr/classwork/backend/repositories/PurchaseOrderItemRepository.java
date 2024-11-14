package edu.oregonstate.engr.classwork.backend.repositories;

import edu.oregonstate.engr.classwork.backend.models.PurchaseOrderItem;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.math.RoundingMode;
import java.sql.Types;
import java.time.LocalDate;
import java.util.List;

@Repository
public class PurchaseOrderItemRepository {
    private final JdbcClient jdbcClient;
    private final RowMapper<PurchaseOrderItem> rowMapper;

    public PurchaseOrderItemRepository(DataSource dataSource) {
        this.jdbcClient = JdbcClient.create(dataSource);

        this.rowMapper = (rs, rowNum) -> {
            PurchaseOrderItem purchaseOrderItem = new PurchaseOrderItem();
            purchaseOrderItem.setPurchase_order_item_id(rs.getInt("purchase_order_item_id"));
            purchaseOrderItem.setUnit_cost(rs.getBigDecimal("unit_cost").setScale(2, RoundingMode.UNNECESSARY));
            purchaseOrderItem.setQuantity(rs.getInt("quantity"));
            purchaseOrderItem.setEstimated_delivery_date(rs.getObject("estimated_delivery_date", LocalDate.class));
            purchaseOrderItem.setDelivery_type(PurchaseOrderItem.DeliveryType.valueOf(rs.getString("delivery_type")));
            purchaseOrderItem.setPurchase_order_id(rs.getInt("purchase_order_id"));
            purchaseOrderItem.setMaterial_id(rs.getInt("material_id"));
            return purchaseOrderItem;
        };
    }

    public List<PurchaseOrderItem> getAll() {
        String sql = "SELECT * FROM PurchaseOrderItems;";
        return jdbcClient.sql(sql).query(rowMapper).list();
    }

    public PurchaseOrderItem getById(int purchase_order_item_id) {
        String sql = "SELECT * FROM PurchaseOrderItems WHERE purchase_order_item_id = :purchase_order_item_id;";
        return jdbcClient.sql(sql).param("purchase_order_item_id", purchase_order_item_id).query(rowMapper).single();
    }

    public int insert(PurchaseOrderItem purchaseOrderItem) {
        String sql = """
                INSERT INTO PurchaseOrderItems (unit_cost, quantity, estimated_delivery_date, delivery_type, purchase_order_id, material_id)
                VALUES (:unit_cost, :quantity, :estimated_delivery_date, :delivery_type, :purchase_order_id, :material_id);
                """;
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcClient.sql(sql)
                .param("unit_cost", purchaseOrderItem.getUnit_cost())
                .param("quantity", purchaseOrderItem.getQuantity())
                .param("estimated_delivery_date", purchaseOrderItem.getEstimated_delivery_date(), Types.DATE)
                .param("delivery_type", purchaseOrderItem.getDelivery_type().toString())
                .param("purchase_order_id", purchaseOrderItem.getPurchase_order_id())
                .param("material_id", purchaseOrderItem.getMaterial_id())
                .update(keyHolder);
        return keyHolder.getKey().intValue();
    }
}