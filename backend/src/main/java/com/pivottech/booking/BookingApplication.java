package com.pivottech.booking;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

@SpringBootApplication
public class BookingApplication {

    @Service
    public class CustomObjectMapper extends ObjectMapper {
        public CustomObjectMapper() {
            this.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
            this.registerModule(new JavaTimeModule());
        }
    }

    @Bean
    public javax.validation.Validator localValidatorFactoryBean() {
        return new LocalValidatorFactoryBean();
    }

    public static void main(String[] args) {
        SpringApplication.run(BookingApplication.class, args);
    }

}
