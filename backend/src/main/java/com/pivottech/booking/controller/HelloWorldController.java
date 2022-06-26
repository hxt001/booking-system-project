package com.pivottech.booking.controller;

import com.pivottech.booking.intercepter.TodaysDate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
public class HelloWorldController {

	@GetMapping("/")
	public String index() {
		return "Hello World!";
	}

	@GetMapping("todaysDate")
	public String todaysDate(@TodaysDate LocalDate todaysDate) {
		return todaysDate.toString();
	}
}
