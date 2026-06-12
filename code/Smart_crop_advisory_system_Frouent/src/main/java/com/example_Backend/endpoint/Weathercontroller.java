package com.example_Backend.endpoint;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example_Backend.entity.UserEntity;
import com.example_Backend.repository.FeignClientconfig;

@Controller
@RequestMapping("/weather")
@PreAuthorize("hasAnyRole('USER','ADMIN')")
public class Weathercontroller {
	
	
	@Autowired
	FeignClientconfig backendserver;
	
	
	@GetMapping
	public String weather() {
		return "weather";
	}
	
	
	@GetMapping("/whatsappalert")
	@ResponseBody
	public String whatsaapp(Principal principal) {
		 UserEntity u=this.backendserver.getuserbyusername(principal.getName());
		String lang=u.getLanguage();
		String  city=u.getState();
		String phone=u.getPhone();
		
		this.backendserver.sendMessages(lang, city, phone);
		System.out.print(u.getName());

		return "done";
	}

}
