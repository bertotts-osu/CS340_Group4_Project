package edu.oregonstate.engr.classwork.backend.models;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDateTime;

@Data //automatically generates getters and setters
public class WorkOrderEmployee {
    @Positive
    private int work_order_id;
    @Positive
    private int employee_id;
    @NotNull
    private LocalDateTime assigned_at;
}