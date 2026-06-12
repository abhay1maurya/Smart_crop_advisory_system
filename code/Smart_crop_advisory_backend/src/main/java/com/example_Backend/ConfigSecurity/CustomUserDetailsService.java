package com.example_Backend.ConfigSecurity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example_Backend.Entity.UserEntity;
import com.example_Backend.Repository.UserRepository;

@Configuration
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	UserRepository userrepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		UserEntity userenti=this.userrepo.findByEmail(username).orElse(null);
		if(userenti==null) {
			return null;
		}
		 return User
	                .withUsername(userenti.getEmail())
	                .password(userenti.getPasswordHash())
	                .roles(userenti.getRole()) // example: USER / ADMIN
	                .build();
	}
	
	

}
