package com.example_Backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "fertilizer")
public class FertilizerEntity {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fertId;

    private String fertName;
    private String category;

    @Column(columnDefinition = "TEXT")
    private String benefits;

    @Column(columnDefinition = "TEXT")
    private String harmfulEffects;

	public int getFertId() {
		return fertId;
	}

	public void setFertId(int fertId) {
		this.fertId = fertId;
	}

	public String getFertName() {
		return fertName;
	}

	public void setFertName(String fertName) {
		this.fertName = fertName;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getBenefits() {
		return benefits;
	}

	public void setBenefits(String benefits) {
		this.benefits = benefits;
	}

	public String getHarmfulEffects() {
		return harmfulEffects;
	}

	public void setHarmfulEffects(String harmfulEffects) {
		this.harmfulEffects = harmfulEffects;
	}

	public FertilizerEntity(int fertId, String fertName, String category, String benefits, String harmfulEffects) {
		super();
		this.fertId = fertId;
		this.fertName = fertName;
		this.category = category;
		this.benefits = benefits;
		this.harmfulEffects = harmfulEffects;
	}

	public FertilizerEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
    
    

}
