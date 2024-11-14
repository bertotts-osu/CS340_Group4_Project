package edu.oregonstate.engr.classwork.backend.models;

import lombok.Data;

import java.math.BigDecimal;

@Data //automatically generates getters and setters
public class Material {
    public enum Unit {
        FT, EA
    }

    private int material_id;
    private String name;
    private Unit unit;
    private BigDecimal unit_cost;
    private int quantity_available;
}