package edu.oregonstate.engr.classwork.backend.repositories;

import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
public class AdminDbUtil {
    private final DataSource dataSource;
    private final ResourceDatabasePopulator resourceDatabasePopulator;

    public AdminDbUtil(DataSource dataSource, ResourceDatabasePopulator resourceDatabasePopulator) {
        this.dataSource = dataSource;
        this.resourceDatabasePopulator = resourceDatabasePopulator;
    }

    public void resetDb() {
        resourceDatabasePopulator.execute(dataSource);
    }
}
