package edu.oregonstate.engr.classwork.backend.models;

import lombok.Data;

import java.util.Objects;

@Data //automatically generates getters and setters
public class Employee {
    private int employee_id;
    private String first_name;
    private String last_name;
    private String email;
    private String phone_number;
    private String status;
    private String skill_level;

    // write custom setter methods for attributes that accept null values
    public void setEmail(String email) {
        this.email = Objects.requireNonNullElse(email, "");
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = Objects.requireNonNullElse(phone_number, "");
    }
}