package com.pivottech.booking.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.joda.time.DateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class Reservation {

    static int counter = 0;

    @Setter(AccessLevel.NONE) final Integer id;
    @NotNull DateTime startTime;
    @NotNull DateTime endTime;
    @NotEmpty String description;

    @Builder
    @JsonCreator
    public Reservation(
            @JsonProperty("startTime") DateTime startTime,
            @JsonProperty("endTime") DateTime endTime,
            @JsonProperty("description") String description
    ) {
        this.id = counter++;
        this.startTime = startTime;
        this.endTime = endTime;
        this.description = description;
    }
}
