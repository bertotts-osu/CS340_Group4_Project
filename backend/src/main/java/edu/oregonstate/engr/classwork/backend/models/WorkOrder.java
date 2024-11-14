package edu.oregonstate.engr.classwork.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
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
    @NotNull
    private Size size;
    @NotNull @jakarta.validation.constraints.Size(min = 1, max = 255)
    private String street;
    @NotNull @jakarta.validation.constraints.Size(min = 1, max = 255)
    private String city;
    @NotNull @jakarta.validation.constraints.Pattern(regexp = "[A-Z][A-Z]", message = "invalid format (ex. CA, NY)")
    private String state;
    @NotNull @jakarta.validation.constraints.Pattern(regexp = "[0-9]{5}", message = "invalid format (ex. 12345, 98765)")
    private String zip;
    @NotNull
    private Stage stage;
    @NotNull
    private LocalDateTime applied_at;
    private LocalDateTime estimated_at;
    private LocalDateTime scheduled_at;
    private LocalDateTime started_at;
    private LocalDateTime completed_at;
    private LocalDateTime on_hold_at;
    private LocalDateTime canceled_at;
}