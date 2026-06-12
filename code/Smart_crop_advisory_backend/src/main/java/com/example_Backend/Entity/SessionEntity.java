package com.example_Backend.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "session")
public class SessionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sessionId;

    private String token;
    private LocalDateTime loginTime;
    private LocalDateTime expiryTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

	public int getSessionId() {
		return sessionId;
	}

	public void setSessionId(int sessionId) {
		this.sessionId = sessionId;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public LocalDateTime getLoginTime() {
		return loginTime;
	}

	public void setLoginTime(LocalDateTime loginTime) {
		this.loginTime = loginTime;
	}

	public LocalDateTime getExpiryTime() {
		return expiryTime;
	}

	public void setExpiryTime(LocalDateTime expiryTime) {
		this.expiryTime = expiryTime;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public SessionEntity(int sessionId, String token, LocalDateTime loginTime, LocalDateTime expiryTime,
			UserEntity user) {
		super();
		this.sessionId = sessionId;
		this.token = token;
		this.loginTime = loginTime;
		this.expiryTime = expiryTime;
		this.user = user;
	}

	public SessionEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
    

}
