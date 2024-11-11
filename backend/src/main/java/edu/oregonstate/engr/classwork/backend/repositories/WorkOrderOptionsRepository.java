package edu.oregonstate.engr.classwork.backend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class WorkOrderOptionsRepository {
    private final JdbcClient jdbcClient;

    @Autowired
    public WorkOrderOptionsRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<String> getWorkOrders() {
        String query = """
            SELECT DISTINCT work_order_id
            FROM WorkOrders;
            """;
        return jdbcClient.sql(query).query((rs, rowNum) -> rs.getString("work_order_id")).list();
    }
}