package edu.oregonstate.engr.classwork.backend.repositories;

import edu.oregonstate.engr.classwork.backend.models.PurchaseOrder;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Types;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class PurchaseOrderRepository {
    private final JdbcClient jdbcClient;
    private final RowMapper<PurchaseOrder> rowMapper;

    public PurchaseOrderRepository(DataSource dataSource) {
        this.jdbcClient = JdbcClient.create(dataSource);

        this.rowMapper = (rs, rowNum) -> {
            PurchaseOrder purchaseOrder = new PurchaseOrder();
            purchaseOrder.setPurchase_order_id(rs.getInt("purchase_order_id"));
            purchaseOrder.setCreated_at(rs.getObject("created_at", LocalDateTime.class));
            purchaseOrder.setEmployee_id(rs.getInt("employee_id"));
            purchaseOrder.setWork_order_id(rs.getInt("work_order_id"));
            if (rs.wasNull()) purchaseOrder.setWork_order_id(null);
            return purchaseOrder;
        };
    }

    public List<PurchaseOrder> getAll() {
        String sql = "SELECT * FROM PurchaseOrders;";
        return jdbcClient.sql(sql).query(rowMapper).list();
    }

    public PurchaseOrder getById(int purchase_order_id) {
        String sql = "SELECT * FROM PurchaseOrders WHERE purchase_order_id = :purchase_order_id;";
        return jdbcClient.sql(sql).param("purchase_order_id", purchase_order_id).query(rowMapper).single();
    }

    public int insert(PurchaseOrder purchaseOrder) {
        String sql = """
                INSERT INTO PurchaseOrders (created_at, employee_id, work_order_id)
                VALUES (:created_at, :employee_id, :work_order_id);
                """;
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcClient.sql(sql)
                .param("created_at", purchaseOrder.getCreated_at(), Types.TIMESTAMP)
                .param("employee_id", purchaseOrder.getEmployee_id())
                .param("work_order_id", purchaseOrder.getWork_order_id())
                .update(keyHolder);
        return keyHolder.getKey().intValue();
    }

    public void update(PurchaseOrder purchaseOrder) {
        String sql = """
                UPDATE PurchaseOrders
                SET created_at = :created_at, employee_id = :employee_id, work_order_id = :work_order_id
                WHERE purchase_order_id = :purchase_order_id;
                """;
        jdbcClient.sql(sql)
                .param("created_at", purchaseOrder.getCreated_at(), Types.TIMESTAMP)
                .param("employee_id", purchaseOrder.getEmployee_id())
                .param("work_order_id", purchaseOrder.getWork_order_id())
                .param("purchase_order_id", purchaseOrder.getPurchase_order_id())
                .update();
    }

    public void delete(int purchase_order_id) {
        String sql = """
                DELETE FROM PurchaseOrders
                WHERE purchase_order_id = :purchase_order_id;
                """;
        jdbcClient.sql(sql)
                .param("purchase_order_id", purchase_order_id)
                .update();
    }
}