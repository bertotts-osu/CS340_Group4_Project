package edu.oregonstate.engr.classwork.backend.models;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data //automatically generates getters and setters
public class Material {
    public enum Unit {
        FT, EA
    }

    private int material_id;
    @NotBlank
    @Size(max = 255)
    private String name;
    @NotNull
    private Unit unit;
    @NotNull
    @Digits(integer = 10, fraction = 2)
    private BigDecimal unit_cost;
    @PositiveOrZero
    private int quantity_available;
}