package com.example_Backend.ConfigSecurity;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class WebSecurity {
	
	@Autowired
	CustumUserDetailServices UserDetailservices;
	
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
        	    .requestMatchers(
        	        "/login",
        	        "/signup",
        	        "/generatedOtp",
        	        "/verifyOtp",
        	        "/sussregister",
        	        "/kisanchatbot",
        	        "/cssfile/**",
        	        "/jsfile/**",
        	        "/img/**",
        	        "/gif/**",
        	        "/team",
        	        "/term"
        	        ,"/"
        	    ).permitAll()

        	    .requestMatchers("/blogpage").hasAnyRole("USER","ADMIN")

        	    .anyRequest().authenticated()
        	)
        .formLogin(form -> form
                .loginPage("/login")          // custom login page URL
                .loginProcessingUrl("/login")// form action
                .defaultSuccessUrl("/", true)
                .failureUrl("/login?error=true")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                
                .logoutSuccessUrl("/login?logout=true")
                .permitAll()
            );
		
		return http.build();
	}
	
	
	@Bean
	public PasswordEncoder passwordencoder() {
		return NoOpPasswordEncoder.getInstance();
	}

}
