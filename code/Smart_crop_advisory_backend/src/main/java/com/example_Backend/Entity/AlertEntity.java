package com.example_Backend.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "alert")
public class AlertEntity {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int alertId;

    private String type;

    @Column(columnDefinition = "TEXT")
    private String message;

    private boolean seen;
    private LocalDateTime alertDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

	public int getAlertId() {
		return alertId;
	}

	public void setAlertId(int alertId) {
		this.alertId = alertId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean isSeen() {
		return seen;
	}

	public void setSeen(boolean seen) {
		this.seen = seen;
	}

	public LocalDateTime getAlertDate() {
		return alertDate;
	}

	public void setAlertDate(LocalDateTime alertDate) {
		this.alertDate = alertDate;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public AlertEntity(int alertId, String type, String message, boolean seen, LocalDateTime alertDate,
			UserEntity user) {
		super();
		this.alertId = alertId;
		this.type = type;
		this.message = message;
		this.seen = seen;
		this.alertDate = alertDate;
		this.user = user;
	}

	public AlertEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    

}
