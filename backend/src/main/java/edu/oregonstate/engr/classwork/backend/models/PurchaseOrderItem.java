package edu.oregonstate.engr.classwork.backend.models;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data //automatically generates getters and setters
public class PurchaseOrderItem {
    public enum DeliveryType {
        Stock, Ship
    }

    private int purchase_order_item_id;
    @NotNull
    @Digits(integer = 10, fraction = 2)
    private BigDecimal unit_cost;
    @PositiveOrZero
    private int quantity;
    private LocalDate estimated_delivery_date;
    @NotNull
    private DeliveryType delivery_type;
    @Positive
    private int purchase_order_id;
    @Positive
    private int material_id;
}