package com.example_Backend.Controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example_Backend.Entity.UserEntity;
import com.example_Backend.entityServices.UserServices;



@RestController
@RequestMapping("/User")
public class Usercontroller {
	
	@Autowired
	UserServices userServices;
	
	
	
	
	@GetMapping("/demo")
	public String demo() {
		return "done";
	}
	
	
	
	
	@GetMapping("/login")
	public UserEntity login(Principal principal) {
		return  this.userServices.getbyusername(principal.getName());
	}
	
	
	 @PostMapping(
		        consumes = MediaType.APPLICATION_JSON_VALUE,
		        produces = MediaType.APPLICATION_JSON_VALUE
		    )
	public UserEntity createUser(@RequestBody  UserEntity user) {
		System.out.print(user.getName());
	    return  this.userServices.createUser(user);
	}
	
	
	
	
	@GetMapping("/byid/{id}")
	public UserEntity getUserById(@PathVariable("id") int id) {
		return this.userServices.getUserById(id);
	}
	
	
	@PutMapping("/update/{id}")
	public UserEntity updateUser(@PathVariable("id") int id, @RequestBody UserEntity newUser) {
	    return this.userServices.updateUser(id, newUser);
	}
	
	@DeleteMapping("/deleteuserbyid/{id}")
	public boolean deleteUser(@PathVariable("id") int id) {
		return this.userServices.deleteUser(id);
	    
	}
	
	/// 
	@DeleteMapping
	public boolean deleteALL() {
		return this.userServices.deleteALL();
	}
	
	@GetMapping
	public List<UserEntity> findalluser(){
		return this.userServices.findalluser();
	}
	
	
	@GetMapping("/getuserbyusername")
	public UserEntity getuserbyusername(@RequestParam("email") String email) {
		return this.userServices.getbyusername(email);
	}
	
	
	
	
	

}
