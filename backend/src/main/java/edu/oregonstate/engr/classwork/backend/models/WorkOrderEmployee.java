package edu.oregonstate.engr.classwork.backend.models;

import lombok.Data;

import java.time.LocalDateTime;

@Data //automatically generates getters and setters
public class WorkOrderEmployee {
    private int work_order_id;
    private int employee_id;
    private LocalDateTime assigned_at;
}