package edu.oregonstate.engr.classwork.backend.repositories;

import edu.oregonstate.engr.classwork.backend.models.PurchaseOrderItem;
import edu.oregonstate.engr.classwork.backend.models.PurchaseOrderItem.PurchaseOrderItemWithNames;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
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
    private final RowMapper<PurchaseOrderItemWithNames> rowMapper;

    public PurchaseOrderItemRepository(DataSource dataSource) {
        this.jdbcClient = JdbcClient.create(dataSource);
        this.rowMapper = (rs, rowNum) -> {
            PurchaseOrderItemWithNames purchaseOrderItem = new PurchaseOrderItemWithNames();
            purchaseOrderItem.setPurchase_order_item_id(rs.getInt("purchase_order_item_id"));
            purchaseOrderItem.setUnit_cost(rs.getBigDecimal("unit_cost").setScale(2, RoundingMode.UNNECESSARY));
            purchaseOrderItem.setQuantity(rs.getInt("quantity"));
            purchaseOrderItem.setEstimated_delivery_date(rs.getObject("estimated_delivery_date", LocalDate.class));
            purchaseOrderItem.setDelivery_type(PurchaseOrderItem.DeliveryType.valueOf(rs.getString("delivery_type")));
            purchaseOrderItem.setPurchase_order_id(rs.getInt("purchase_order_id"));
            purchaseOrderItem.setMaterial_id(rs.getInt("material_id"));
            purchaseOrderItem.setMaterial_name(rs.getString("name"));
            return purchaseOrderItem;
        };
    }

    public List<PurchaseOrderItemWithNames> getAll() {
        String sql = """
                SELECT PurchaseOrderItems.*, Materials.name
                FROM PurchaseOrderItems INNER JOIN Materials ON PurchaseOrderItems.material_id = Materials.material_id;
                """;
        return jdbcClient.sql(sql).query(rowMapper).list();
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

    public void update(PurchaseOrderItem purchaseOrderItem) {
        String sql = """
                UPDATE PurchaseOrderItems
                SET
                    unit_cost = :unit_cost, quantity = :quantity, estimated_delivery_date = :estimated_delivery_date,
                    delivery_type = :delivery_type, purchase_order_id = :purchase_order_id, material_id = :material_id
                WHERE purchase_order_item_id = :purchase_order_item_id;
                """;
        int updatedRows = jdbcClient.sql(sql)
                .param("unit_cost", purchaseOrderItem.getUnit_cost())
                .param("quantity", purchaseOrderItem.getQuantity())
                .param("estimated_delivery_date", purchaseOrderItem.getEstimated_delivery_date())
                .param("delivery_type", purchaseOrderItem.getDelivery_type().toString())
                .param("purchase_order_id", purchaseOrderItem.getPurchase_order_id())
                .param("material_id", purchaseOrderItem.getMaterial_id())
                .param("purchase_order_item_id", purchaseOrderItem.getPurchase_order_item_id())
                .update();
        if (updatedRows == 0) throw new IncorrectResultSizeDataAccessException(1, 0);
    }

    public void delete(int purchase_order_item_id) {
        String sql = """
                DELETE FROM PurchaseOrderItems
                WHERE purchase_order_item_id = :purchase_order_item_id;
                """;
        jdbcClient.sql(sql)
                .param("purchase_order_item_id", purchase_order_item_id)
                .update();
    }
}