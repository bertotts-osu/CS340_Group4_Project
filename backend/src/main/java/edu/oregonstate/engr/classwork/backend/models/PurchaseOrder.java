package edu.oregonstate.engr.classwork.backend.models;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDateTime;

@Data //automatically generates getters and setters
public class PurchaseOrder {
    private int purchase_order_id;
    @NotNull
    private LocalDateTime created_at;
    @Positive
    private int employee_id;
    @Positive
    private Integer work_order_id; //use Integer class to allow null values

    @Data
    public static class PurchaseOrderWithNames extends PurchaseOrder {
        private String employee_name;
    }
}