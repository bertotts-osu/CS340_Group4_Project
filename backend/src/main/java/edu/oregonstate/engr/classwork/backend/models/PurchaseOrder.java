package edu.oregonstate.engr.classwork.backend.models;

import lombok.Data;

import java.time.LocalDateTime;

@Data //automatically generates getters and setters
public class PurchaseOrder {
    private int purchase_order_id;
    private LocalDateTime created_at;
    private int employee_id;
    private Integer work_order_id; //use Integer class to allow null values
}