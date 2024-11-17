package edu.oregonstate.engr.classwork.backend.repositories;

import edu.oregonstate.engr.classwork.backend.models.PurchaseOrder;
import edu.oregonstate.engr.classwork.backend.models.PurchaseOrder.PurchaseOrderWithNames;
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
public class PurchaseOrderRepository {
    private final JdbcClient jdbcClient;
    private final RowMapper<PurchaseOrderWithNames> rowMapper;

    public PurchaseOrderRepository(DataSource dataSource) {
        this.jdbcClient = JdbcClient.create(dataSource);
        this.rowMapper = (rs, rowNum) -> {
            PurchaseOrderWithNames purchaseOrder = new PurchaseOrderWithNames();
            purchaseOrder.setPurchase_order_id(rs.getInt("purchase_order_id"));
            purchaseOrder.setCreated_at(rs.getObject("created_at", LocalDateTime.class));
            purchaseOrder.setEmployee_id(rs.getInt("employee_id"));
            purchaseOrder.setWork_order_id(rs.getInt("work_order_id"));
            if (rs.wasNull()) purchaseOrder.setWork_order_id(null);
            String first_name = rs.getString("first_name");
            String last_name = rs.getString("last_name");
            purchaseOrder.setEmployee_name(first_name + " " + last_name);
            return purchaseOrder;
        };
    }

    public List<PurchaseOrderWithNames> getAll() {
        String sql = """
                SELECT PurchaseOrders.*, Employees.first_name, Employees.last_name
                FROM PurchaseOrders INNER JOIN Employees ON PurchaseOrders.employee_id = Employees.employee_id;
                """;
        return jdbcClient.sql(sql).query(rowMapper).list();
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
        int updatedRows = jdbcClient.sql(sql)
                .param("created_at", purchaseOrder.getCreated_at(), Types.TIMESTAMP)
                .param("employee_id", purchaseOrder.getEmployee_id())
                .param("work_order_id", purchaseOrder.getWork_order_id())
                .param("purchase_order_id", purchaseOrder.getPurchase_order_id())
                .update();
        if (updatedRows == 0) throw new IncorrectResultSizeDataAccessException(1, 0);
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