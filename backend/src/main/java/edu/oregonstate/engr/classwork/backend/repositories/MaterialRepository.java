package edu.oregonstate.engr.classwork.backend.repositories;

import edu.oregonstate.engr.classwork.backend.models.Material;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.math.RoundingMode;
import java.util.List;

@Repository
public class MaterialRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MaterialRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Material> getAll() {
        String sql = "SELECT * FROM Materials";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Material rowObject = new Material();
            rowObject.setMaterial_id(rs.getInt("material_id"));
            rowObject.setName(rs.getString("name"));
            rowObject.setUnit(rs.getString("unit"));
            rowObject.setUnit_cost(rs.getBigDecimal("unit_cost").setScale(2, RoundingMode.UNNECESSARY));
            rowObject.setQuantity_available(rs.getInt("quantity_available"));
            return rowObject;
        });
    }
}