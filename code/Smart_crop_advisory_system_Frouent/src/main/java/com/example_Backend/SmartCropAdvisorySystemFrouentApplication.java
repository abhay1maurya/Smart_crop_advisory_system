package com.example_Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class SmartCropAdvisorySystemFrouentApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartCropAdvisorySystemFrouentApplication.class, args);
	}

}
