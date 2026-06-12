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
@Table(name = "pest_report")
public class PestReportEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pestId;

    private String imageUrl;
    private String detectedDisease;
    private String detectedPest;
    private String severity;
    private float confidence;
    private LocalDateTime uploadedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

	public int getPestId() {
		return pestId;
	}

	public void setPestId(int pestId) {
		this.pestId = pestId;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getDetectedDisease() {
		return detectedDisease;
	}

	public void setDetectedDisease(String detectedDisease) {
		this.detectedDisease = detectedDisease;
	}

	public String getDetectedPest() {
		return detectedPest;
	}

	public void setDetectedPest(String detectedPest) {
		this.detectedPest = detectedPest;
	}

	public String getSeverity() {
		return severity;
	}

	public void setSeverity(String severity) {
		this.severity = severity;
	}

	public float getConfidence() {
		return confidence;
	}

	public void setConfidence(float confidence) {
		this.confidence = confidence;
	}

	public LocalDateTime getUploadedAt() {
		return uploadedAt;
	}

	public void setUploadedAt(LocalDateTime uploadedAt) {
		this.uploadedAt = uploadedAt;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public PestReportEntity(int pestId, String imageUrl, String detectedDisease, String detectedPest, String severity,
			float confidence, LocalDateTime uploadedAt, UserEntity user) {
		super();
		this.pestId = pestId;
		this.imageUrl = imageUrl;
		this.detectedDisease = detectedDisease;
		this.detectedPest = detectedPest;
		this.severity = severity;
		this.confidence = confidence;
		this.uploadedAt = uploadedAt;
		this.user = user;
	}

	public PestReportEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
    

}
