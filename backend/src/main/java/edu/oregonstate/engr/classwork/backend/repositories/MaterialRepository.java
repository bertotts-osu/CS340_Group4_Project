package edu.oregonstate.engr.classwork.backend.repositories;

import edu.oregonstate.engr.classwork.backend.models.Material;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.math.RoundingMode;
import java.util.List;

@Repository
public class MaterialRepository {
    private final JdbcClient jdbcClient;
    private final RowMapper<Material> rowMapper;

    public MaterialRepository(DataSource dataSource) {
        this.jdbcClient = JdbcClient.create(dataSource);

        this.rowMapper = (rs, rowNum) -> {
            Material material = new Material();
            material.setMaterial_id(rs.getInt("material_id"));
            material.setName(rs.getString("name"));
            material.setUnit(Material.Unit.valueOf(rs.getString("unit")));
            material.setUnit_cost(rs.getBigDecimal("unit_cost").setScale(2, RoundingMode.UNNECESSARY));
            material.setQuantity_available(rs.getInt("quantity_available"));
            return material;
        };
    }

    public List<Material> getAll() {
        String sql = "SELECT * FROM Materials;";
        return jdbcClient.sql(sql).query(rowMapper).list();
    }

    public Material getById(int material_id) {
        String sql = "SELECT * FROM Materials WHERE material_id = :material_id;";
        return jdbcClient.sql(sql).param("material_id", material_id).query(rowMapper).single();
    }

    public int insert(Material material) {
        String sql = """
                INSERT INTO Materials (name, unit, unit_cost, quantity_available)
                VALUES (:name, :unit, :unit_cost, :quantity_available);
                """;
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcClient.sql(sql)
                .param("name", material.getName())
                .param("unit", material.getUnit().toString())
                .param("unit_cost", material.getUnit_cost())
                .param("quantity_available", material.getQuantity_available())
                .update(keyHolder);
        return keyHolder.getKey().intValue();
    }

    public void update(Material material) {
        String sql = """
                UPDATE Materials
                SET name = :name, unit = :unit, unit_cost = :unit_cost, quantity_available = :quantity_available
                WHERE material_id = :material_id;
                """;
        jdbcClient.sql(sql)
                .param("name", material.getName())
                .param("material_id", material.getMaterial_id())
                .param("unit", material.getUnit().toString())
                .param("unit_cost", material.getUnit_cost())
                .param("quantity_available", material.getQuantity_available())
                .update();
    }

    public void delete(int material_id) {
        String sql = """
                DELETE FROM Materials
                WHERE material_id = :material_id;
                """;
        jdbcClient.sql(sql)
                .param("material_id", material_id)
                .update();
    }
}