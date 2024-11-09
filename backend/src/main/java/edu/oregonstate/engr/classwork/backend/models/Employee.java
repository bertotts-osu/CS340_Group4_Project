package edu.oregonstate.engr.classwork.backend.models;

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
    private String first_name;
    private String last_name;
    private String email;
    private String phone_number;
    private Status status;
    private SkillLevel skill_level;
}