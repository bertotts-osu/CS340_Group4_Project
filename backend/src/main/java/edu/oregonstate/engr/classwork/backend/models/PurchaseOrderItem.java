package edu.oregonstate.engr.classwork.backend.models;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data //automatically generates getters and setters
public class PurchaseOrderItem {
    private int purchase_order_item_id;
    private BigDecimal unit_cost;
    private int quantity;
    private LocalDate estimated_delivery_date;
    private String delivery_type;
    private int purchase_order_id;
    private int material_id;
}