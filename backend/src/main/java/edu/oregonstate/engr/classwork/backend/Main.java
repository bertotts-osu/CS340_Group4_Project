package edu.oregonstate.engr.classwork.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    public ResourceDatabasePopulator resourceDatabasePopulator() {
        Resource ddl = new ClassPathResource("DDL.sql");
        return new ResourceDatabasePopulator(ddl);
    }
}