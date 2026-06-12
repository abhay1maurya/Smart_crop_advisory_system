package com.example_Backend.ConfigSecurity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example_Backend.entity.UserEntity;
import com.example_Backend.repository.FeignClientconfig;

@Configuration
public class CustumUserDetailServices implements UserDetailsService {
	
	@Autowired
	FeignClientconfig feignclient;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		
		UserEntity userentiy=this.feignclient.getuserbyusername(username);
		if(userentiy==null) {
			return null;
		}
		return User.withUsername(userentiy.getEmail()).password(userentiy.getPasswordHash()).roles(userentiy.getRole()).build();
	}

}
