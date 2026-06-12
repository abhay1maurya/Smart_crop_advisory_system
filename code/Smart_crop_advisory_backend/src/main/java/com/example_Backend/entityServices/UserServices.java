package com.example_Backend.entityServices;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example_Backend.Entity.UserEntity;
import com.example_Backend.Repository.UserRepository;

@Service
public class UserServices {
	@Autowired
	UserRepository userRepository;
	
	public UserEntity createUser(UserEntity user) {
		user.setCreatedAt(LocalDateTime.now());
	     return  userRepository.save(user);
	}
	
	public UserEntity getUserById(int id) {
	    return userRepository.findById(id).orElse(null);
	}
	
	
	public UserEntity updateUser(int id, UserEntity newUser) {
	    UserEntity old = userRepository.findById(id).orElse(null);
	    if(old==null) {
	    	return null;
	    }
	    else {
	    	if(newUser.getName()!=null) {
	    		old.setName(newUser.getName());
	    	}
	    	if(newUser.getEmail()!=null) {
	    		old.setEmail(newUser.getEmail());
	    	}
	    	if(newUser.getPhone()!=null) {
	    		old.setPhone(newUser.getPhone());
	    	}
	    	if(newUser.getLanguage()!=null) {
	    		old.setLanguage(newUser.getLanguage());
	    	}
	    	if(newUser.getDistrict()!=null) {
	    		old.setDistrict(newUser.getDistrict());
	    	}
	    	if(newUser.getState()!=null) {
	    		old.setState(newUser.getState());;
	    	}
	    	if(newUser.getPasswordHash()!=null) {
	    		old.setPasswordHash(newUser.getPasswordHash());
	    	}
	    	if(newUser.getOtp()!=0) {
	    		old.setOtp(newUser.getOtp());
	    	}
	    	if(newUser.getRole()!=null) {
	    		old.setRole(newUser.getRole());
	    	}
	    	
	    }
	    return userRepository.save(old);
	}
	
	public boolean deleteUser(int id) {
		try {
			UserEntity user=userRepository.findById(id).orElse(null);
			if(user==null) {
				return false;
			}
			userRepository.delete(user);
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			
		}
		return false;
	    
	}
	
	/// 
	public boolean deleteALL() {
		try {
			userRepository.deleteAll();
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			
		}
		return false;
	}
	
	public List<UserEntity> findalluser(){
		return this.userRepository.findAll();
	}
	
	public UserEntity  getbyusername(String email) {
		return this.userRepository.findByEmail(email).orElse(null);
	}
	
	

}
