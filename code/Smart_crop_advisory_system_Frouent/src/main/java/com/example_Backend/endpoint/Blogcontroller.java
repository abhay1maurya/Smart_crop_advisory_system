package com.example_Backend.endpoint;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.example_Backend.entity.BlogPostEntity;
import com.example_Backend.entity.UserEntity;
import com.example_Backend.repository.EmailService;
import com.example_Backend.repository.FeignClientconfig;

@Controller
@PreAuthorize("hasAnyRole('USER','ADMIN')")
public class Blogcontroller {
	
	@Autowired
	FeignClientconfig backendserver;
	
	
	  @Autowired
	  private EmailService emailService;
	
	
	
	@GetMapping("/blogpage")
	public String blogpage(Principal principal,Model mo ) {
		String email=principal.getName();
		UserEntity user=this.backendserver.getuserbyusername(email);
	   
		mo.addAttribute("userdetail", user);
	  List<BlogPostEntity>allblog=this.backendserver.findallblog();
		mo.addAttribute("allblog",allblog);
		return "blog";
	}
	
	
	@GetMapping("/newpage")
	public String newpageblog(@ModelAttribute BlogPostEntity blog, Principal principal) {
		BlogPostEntity blogs=this.backendserver.createBlog(blog, principal.getName());
		return "redirect:/blogpage";
	}
	
	
	
	
	
	

}
