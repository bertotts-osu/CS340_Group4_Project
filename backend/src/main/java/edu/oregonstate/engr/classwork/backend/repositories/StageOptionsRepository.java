package edu.oregonstate.engr.classwork.backend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Repository
public class StageOptionsRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StageOptionsRepository(JdbcTemplate jdbc) {
        this.jdbcTemplate = jdbc;
    }

    public List<String> getStages() {
        String query = """
            SHOW COLUMNS FROM WorkOrders
            WHERE Field = 'Stage'
            """;
        Map<String, Object> result = jdbcTemplate.queryForMap(query);
        String enumValues = (String) result.get("Type"); //extract the enum values
        enumValues = enumValues.replace("enum(", "").replace(")", "").replace("'", "");
        return Arrays.asList(enumValues.split(","));
    }
}

