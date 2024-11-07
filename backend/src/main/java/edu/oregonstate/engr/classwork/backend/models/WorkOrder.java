package edu.oregonstate.engr.classwork.backend.models;

import lombok.Data;
import java.util.Objects;

@Data //automatically generates getters and setters
public class WorkOrder {
    private int work_order_id;
    private String size;
    private String street;
    private String city;
    private String zip;
    private String stage;
    private String applied_at;
    private String estimated_at;
    private String scheduled_at;
    private String started_at;
    private String completed_at;
    private String on_hold_at;
    private String canceled_at;

    // write custom setter methods for attributes that accept null values
    public void setEstimated_at(String estimated_at) {
        this.estimated_at = Objects.requireNonNullElse(estimated_at, "");
    }

    public void setScheduled_at(String scheduled_at) {
        this.scheduled_at = Objects.requireNonNullElse(scheduled_at, "");
    }

    public void setStarted_at(String started_at) {
        this.started_at = Objects.requireNonNullElse(started_at, "");
    }

    public void setCompleted_at(String completed_at) {
        this.completed_at = Objects.requireNonNullElse(completed_at, "");
    }

    public void setOn_hold_at(String on_hold_at) {
        this.on_hold_at = Objects.requireNonNullElse(on_hold_at, "");
    }

    public void setCanceled_at(String canceled_at) {
        this.canceled_at = Objects.requireNonNullElse(canceled_at, "");
    }
}