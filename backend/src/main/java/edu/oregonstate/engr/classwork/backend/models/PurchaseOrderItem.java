package edu.oregonstate.engr.classwork.backend.models;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Objects;

@Data //automatically generates getters and setters
public class PurchaseOrderItem {
    private int purchase_order_item_id;
    private BigDecimal unit_cost;
    private int quantity;
    private String estimated_delivery_date;
    private String delivery_type;
    private int purchase_order_id;
    private int material_id;

    // write custom setter methods for attributes that accept null values
    public void setEstimated_delivery_date(String estimated_delivery_date) {
        this.estimated_delivery_date = Objects.requireNonNullElse(estimated_delivery_date, "");
    }
}