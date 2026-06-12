package com.example_Backend.Entity;


import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class UserEntity {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    // --- Relationships ---
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<SessionEntity> sessions;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<SoilReportEntity> soilReports;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<PestReportEntity> pestReports;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<WeatherHistoryEntity> weatherHistory;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<AlertEntity> alerts;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonBackReference
    @JsonIgnore
    private List<BlogPostEntity> blogPosts;

	public UserEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserEntity(int userId, String name, String email, String phone, String passwordHash, String role,
			String language, String district, String state, LocalDateTime createdAt, List<SessionEntity> sessions,
			List<SoilReportEntity> soilReports, List<PestReportEntity> pestReports,
			List<WeatherHistoryEntity> weatherHistory, List<AlertEntity> alerts, List<BlogPostEntity> blogPosts) {
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
		this.createdAt = createdAt;
		this.sessions = sessions;
		this.soilReports = soilReports;
		this.pestReports = pestReports;
		this.weatherHistory = weatherHistory;
		this.alerts = alerts;
		this.blogPosts = blogPosts;
	}

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

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public List<SessionEntity> getSessions() {
		return sessions;
	}

	public void setSessions(List<SessionEntity> sessions) {
		this.sessions = sessions;
	}

	public List<SoilReportEntity> getSoilReports() {
		return soilReports;
	}

	public void setSoilReports(List<SoilReportEntity> soilReports) {
		this.soilReports = soilReports;
	}

	public List<PestReportEntity> getPestReports() {
		return pestReports;
	}

	public void setPestReports(List<PestReportEntity> pestReports) {
		this.pestReports = pestReports;
	}

	public List<WeatherHistoryEntity> getWeatherHistory() {
		return weatherHistory;
	}

	public void setWeatherHistory(List<WeatherHistoryEntity> weatherHistory) {
		this.weatherHistory = weatherHistory;
	}

	public List<AlertEntity> getAlerts() {
		return alerts;
	}

	public void setAlerts(List<AlertEntity> alerts) {
		this.alerts = alerts;
	}

	public List<BlogPostEntity> getBlogPosts() {
		return blogPosts;
	}

	public void setBlogPosts(List<BlogPostEntity> blogPosts) {
		this.blogPosts = blogPosts;
	}

	public int getOtp() {
		return otp;
	}

	public void setOtp(int otp) {
		this.otp = otp;
	}
	
	
    
    
    
	
	
	
	
    
    
    
	

}
