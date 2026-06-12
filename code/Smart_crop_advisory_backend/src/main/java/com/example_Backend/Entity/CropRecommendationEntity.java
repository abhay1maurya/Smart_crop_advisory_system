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
@Table(name = "crop_recommendation")
public class CropRecommendationEntity {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cropRecId;

    private String cropName;
    private String recommendedSeason;
    private String confidence;
    private String reason;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "report_id")
    private SoilReportEntity soilReport;
    
    

	public int getCropRecId() {
		return cropRecId;
	}

	public void setCropRecId(int cropRecId) {
		this.cropRecId = cropRecId;
	}

	public String getCropName() {
		return cropName;
	}

	public void setCropName(String cropName) {
		this.cropName = cropName;
	}

	public String getRecommendedSeason() {
		return recommendedSeason;
	}

	public void setRecommendedSeason(String recommendedSeason) {
		this.recommendedSeason = recommendedSeason;
	}

	public String getConfidence() {
		return confidence;
	}

	public void setConfidence(String confidence) {
		this.confidence = confidence;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public SoilReportEntity getSoilReport() {
		return soilReport;
	}

	public void setSoilReport(SoilReportEntity soilReport) {
		this.soilReport = soilReport;
	}

	public CropRecommendationEntity(int cropRecId, String cropName, String recommendedSeason, String confidence,
			String reason, LocalDateTime createdAt, SoilReportEntity soilReport) {
		super();
		this.cropRecId = cropRecId;
		this.cropName = cropName;
		this.recommendedSeason = recommendedSeason;
		this.confidence = confidence;
		this.reason = reason;
		this.createdAt = createdAt;
		this.soilReport = soilReport;
	}

	public CropRecommendationEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    

}
