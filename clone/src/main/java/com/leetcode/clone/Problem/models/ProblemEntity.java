package com.leetcode.clone.Problem.models;

import jakarta.persistence.Entity;


@Entity
public class ProblemEntity {

    private String title;
    private String description;
    private String driverCode;      // the wrapper
    private String inputFormat;     // JSON schema
    private String expectedOutput;  // for each test case

}
