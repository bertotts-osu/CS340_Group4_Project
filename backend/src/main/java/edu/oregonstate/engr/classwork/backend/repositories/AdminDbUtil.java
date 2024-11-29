package edu.oregonstate.engr.classwork.backend.repositories;

import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.SQLException;

@Component
public class AdminDbUtil {
    private final DataSource dataSource;
    private final ResourceDatabasePopulator resourceDatabasePopulator;

    public AdminDbUtil(DataSource dataSource, ResourceDatabasePopulator resourceDatabasePopulator) {
        this.dataSource = dataSource;
        this.resourceDatabasePopulator = resourceDatabasePopulator;
    }

    public void resetDb() {
        try {
            resourceDatabasePopulator.populate(dataSource.getConnection());
        } catch (SQLException ex) {
            throw new CannotGetJdbcConnectionException(ex.getMessage(), ex);
        }
    }
}
