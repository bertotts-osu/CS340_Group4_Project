package edu.oregonstate.engr.classwork.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDateTime;

@Data //automatically generates getters and setters
public class WorkOrder {
    public enum State {
        AL, AK, AZ, AR, CA, CO, CT, DE, DC, FL, GA, HI, ID, IL, IN, IA, KS, KY, LA, ME, MT, NE, NV, NH, NJ, NM, NY, NC,
        ND, OH, OK, OR, MD, MA, MI, MN, MS, MO, PA, RI, SC, SD, TN, TX, UT, VT, VA, WA, WV, WI, WY
    }

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
    @NotBlank
    @jakarta.validation.constraints.Size(max = 255)
    private String street;
    @NotBlank
    @jakarta.validation.constraints.Size(max = 255)
    private String city;
    @NotNull
    private State state;
    @NotBlank
    @Pattern(regexp = "[0-9]{5}", message = "invalid format (ex. 12345, 98765)")
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