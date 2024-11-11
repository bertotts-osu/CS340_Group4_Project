package edu.oregonstate.engr.classwork.backend.models;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonProperty; // sets the JSON key name
import com.fasterxml.jackson.annotation.JsonIgnore;  //
import java.time.LocalDateTime;

@Data //automatically generates getters and setters
public class WorkOrderEmployee {
    @JsonProperty("Work Order")
    private int workOrderID;

    @JsonIgnore // excludes this attribute from the JSON output
    private int employeeID;

    @JsonProperty("Employee Name")
    private String employeeName;

    @JsonProperty("Assigned At")
    private LocalDateTime assignedAt;
}