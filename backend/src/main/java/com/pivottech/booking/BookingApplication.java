package com.pivottech.booking;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.pivottech.booking.intercepter.LogIntercepter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.stereotype.Service;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BookingApplication {

	@Service
	public static class CustomObjectMapper extends ObjectMapper {

		public CustomObjectMapper() {
			this.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
			this.registerModule(new JavaTimeModule());
		}

	}

	@Configuration
	public static class WebMVCConfig implements WebMvcConfigurer {

		@Override
		public void addInterceptors(InterceptorRegistry registry) {
			registry.addInterceptor(new LogIntercepter());
			WebMvcConfigurer.super.addInterceptors(registry);
		}

	}

	@Configuration
	@EnableWebSecurity
	public static class WebSecurityConfig extends WebSecurityConfigurerAdapter {

		@Override
		protected void configure(HttpSecurity http) throws Exception {
			// @formatter:off
			http.csrf().disable()
				.authorizeRequests()
					.antMatchers("/").permitAll()
					.antMatchers(HttpMethod.POST, "/users").permitAll()
					.anyRequest().authenticated()
					.and()
				.exceptionHandling()
					.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
					.and()
				.formLogin()
					.loginPage("/login").permitAll()
					.and()
				.logout().permitAll();
			// @formatter:on
		}

	}

	@Bean
	public javax.validation.Validator localValidatorFactoryBean() {
		return new LocalValidatorFactoryBean();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	public static void main(String[] args) {
		SpringApplication.run(BookingApplication.class, args);
	}

}
