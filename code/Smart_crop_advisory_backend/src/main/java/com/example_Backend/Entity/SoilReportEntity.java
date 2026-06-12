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
@Table(name = "soil_report")
public class SoilReportEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reportId;

    private float nitrogen;
    private float phosphorus;
    private float potassium;
    private float ph;
    private float moisture;
    private String soilType;
    
    private LocalDateTime reportDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

	public int getReportId() {
		return reportId;
	}

	public void setReportId(int reportId) {
		this.reportId = reportId;
	}

	public float getNitrogen() {
		return nitrogen;
	}

	public void setNitrogen(float nitrogen) {
		this.nitrogen = nitrogen;
	}

	public float getPhosphorus() {
		return phosphorus;
	}

	public void setPhosphorus(float phosphorus) {
		this.phosphorus = phosphorus;
	}

	public float getPotassium() {
		return potassium;
	}

	public void setPotassium(float potassium) {
		this.potassium = potassium;
	}

	public float getPh() {
		return ph;
	}

	public void setPh(float ph) {
		this.ph = ph;
	}

	public float getMoisture() {
		return moisture;
	}

	public void setMoisture(float moisture) {
		this.moisture = moisture;
	}

	public String getSoilType() {
		return soilType;
	}

	public void setSoilType(String soilType) {
		this.soilType = soilType;
	}

	public LocalDateTime getReportDate() {
		return reportDate;
	}

	public void setReportDate(LocalDateTime reportDate) {
		this.reportDate = reportDate;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public SoilReportEntity(int reportId, float nitrogen, float phosphorus, float potassium, float ph, float moisture,
			String soilType, LocalDateTime reportDate, UserEntity user) {
		super();
		this.reportId = reportId;
		this.nitrogen = nitrogen;
		this.phosphorus = phosphorus;
		this.potassium = potassium;
		this.ph = ph;
		this.moisture = moisture;
		this.soilType = soilType;
		this.reportDate = reportDate;
		this.user = user;
	}

	public SoilReportEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
    

}
