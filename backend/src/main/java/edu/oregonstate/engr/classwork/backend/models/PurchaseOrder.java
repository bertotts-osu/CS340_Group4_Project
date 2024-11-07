package edu.oregonstate.engr.classwork.backend.models;

import lombok.Data;

import java.util.Objects;

@Data //automatically generates getters and setters
public class PurchaseOrder {
    private int purchase_order_id;
    private String created_at;
    private int employee_id;
    private Integer work_order_id; //use Integer class to allow null values

    // write custom setter methods for attributes that accept null values
    public void setWork_order_id(Integer work_order_id) {
        this.work_order_id = Objects.requireNonNullElse(work_order_id, -1);
    }
}