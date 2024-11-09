package edu.oregonstate.engr.classwork.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data //automatically generates getters and setters
public class WorkOrder {
    public enum Size {
        Small, Medium, Large;
    }

    public enum Stage {
        Applied, Estimated, Paid, Scheduled, @JsonProperty("In Progress") In_Progress,
        Completed, @JsonProperty("On Hold") On_Hold, Canceled;
    }

    private int work_order_id;
    private Size size;
    private String street;
    private String city;
    private String state;
    private String zip;
    private Stage stage;
    private LocalDateTime applied_at;
    private LocalDateTime estimated_at;
    private LocalDateTime scheduled_at;
    private LocalDateTime started_at;
    private LocalDateTime completed_at;
    private LocalDateTime on_hold_at;
    private LocalDateTime canceled_at;
}