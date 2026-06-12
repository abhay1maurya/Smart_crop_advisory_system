package com.example_Backend.DTO;

import java.time.LocalDateTime;
import java.util.List;

import com.example_Backend.Entity.BlogPostEntity;



public class UserEntityDTO {
	
	
    private int userId;

    // These names MUST match your JSON keys exactly
    private String name;
    private String email;
    private String phone;
    private String passwordHash;
    private String role;
    private String language;
    private String district;
    private String state;
    private int otp;
    private LocalDateTime createdAt;
    
    private List<BlogPostEntity> blogPosts;

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPasswordHash() {
		return passwordHash;
	}

	public void setPasswordHash(String passwordHash) {
		this.passwordHash = passwordHash;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public int getOtp() {
		return otp;
	}

	public void setOtp(int otp) {
		this.otp = otp;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public List<BlogPostEntity> getBlogPosts() {
		return blogPosts;
	}

	public void setBlogPosts(List<BlogPostEntity> blogPosts) {
		this.blogPosts = blogPosts;
	}

	public UserEntityDTO(int userId, String name, String email, String phone, String passwordHash, String role,
			String language, String district, String state, int otp, LocalDateTime createdAt,
			List<BlogPostEntity> blogPosts) {
		super();
		this.userId = userId;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.passwordHash = passwordHash;
		this.role = role;
		this.language = language;
		this.district = district;
		this.state = state;
		this.otp = otp;
		this.createdAt = createdAt;
		this.blogPosts = blogPosts;
	}

	public UserEntityDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
    
    
	
	

}
