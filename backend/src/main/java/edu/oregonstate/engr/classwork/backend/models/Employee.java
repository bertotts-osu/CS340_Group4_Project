package edu.oregonstate.engr.classwork.backend.models;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data //automatically generates getters and setters
public class Employee {
    public enum Status {
        Active, Inactive
    }

    public enum SkillLevel {
        Apprentice, Associate, Principal
    }

    private int employee_id;
    @NotBlank
    @Size(max = 255)
    private String first_name;
    @NotBlank
    @Size(max = 255)
    private String last_name;
    @Email
    @Size(max = 255)
    private String email;
    @Pattern(regexp = "[0-9]{3}-[0-9]{3}-[0-9]{4}", message = "invalid format (ex. 123-456-7890)")
    private String phone_number;
    @NotNull
    private Status status;
    @NotNull
    private SkillLevel skill_level;
}