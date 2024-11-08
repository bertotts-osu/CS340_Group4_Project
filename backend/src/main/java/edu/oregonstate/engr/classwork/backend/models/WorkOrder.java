package edu.oregonstate.engr.classwork.backend.models;

import lombok.Data;

import java.time.LocalDateTime;

@Data //automatically generates getters and setters
public class WorkOrder {
    private int work_order_id;
    private String size;
    private String street;
    private String city;
    private String state;
    private String zip;
    private String stage;
    private LocalDateTime applied_at;
    private LocalDateTime estimated_at;
    private LocalDateTime scheduled_at;
    private LocalDateTime started_at;
    private LocalDateTime completed_at;
    private LocalDateTime on_hold_at;
    private LocalDateTime canceled_at;
}