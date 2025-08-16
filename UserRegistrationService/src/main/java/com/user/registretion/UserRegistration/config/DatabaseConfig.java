package com.user.registretion.UserRegistration.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {
    @Value("${spring.datasource.url}")
    String url;

    @Value("${spring.datasource.username}")
    String username;

    @Value("${spring.datasource.password}")
    String password;

    @Value("${spring.datasource.driver-class-name}")
    String driverClassName;

//    @Bean
//    public DataSource hikariDataSource() {
//        HikariConfig hikariConfig = new HikariConfig();
//
//        hikariConfig.setJdbcUrl(this.url);
//        hikariConfig.setUsername(this.username);
//        hikariConfig.setPassword(this.password);
//        hikariConfig.setDriverClassName(this.driverClassName);
//
//        hikariConfig.setPoolName("user-registration-db-pool");
//        hikariConfig.setMaximumPoolSize(20);
//        hikariConfig.setMinimumIdle(1);
//        hikariConfig.setConnectionTimeout(100000);
//        hikariConfig.setMaxLifetime(600000L);
//        hikariConfig.setConnectionTestQuery("SELECT 1");
//
//        return new HikariDataSource(hikariConfig);
//    }
}