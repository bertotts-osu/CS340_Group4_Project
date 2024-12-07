package edu.oregonstate.engr.classwork.backend.repositories;

import edu.oregonstate.engr.classwork.backend.controllers.GlobalExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Component
public class AdminDbUtil {
    private final Logger logger = LoggerFactory.getLogger(AdminDbUtil.class);

    private final DataSource dataSource;
    private final ResourceDatabasePopulator resourceDatabasePopulator;

    public AdminDbUtil(DataSource dataSource, ResourceDatabasePopulator resourceDatabasePopulator) {
        this.dataSource = dataSource;
        this.resourceDatabasePopulator = resourceDatabasePopulator;
    }

    public synchronized void resetDb() {
        try (Connection con = dataSource.getConnection()) {
            resourceDatabasePopulator.populate(con);
            logger.info("DB reset");
        } catch (SQLException ex) {
            throw new CannotGetJdbcConnectionException(ex.getMessage(), ex);
        }
    }
}
