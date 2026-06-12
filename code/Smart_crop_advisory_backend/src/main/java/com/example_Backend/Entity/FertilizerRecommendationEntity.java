package com.example_Backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "fertilizer_recommendation")
public class FertilizerRecommendationEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fertRecId;

    private float quantityKgPerAcre;

    @Column(columnDefinition = "TEXT")
    private String instruction;

    @ManyToOne
    @JoinColumn(name = "report_id")
    private SoilReportEntity soilReport;

    @ManyToOne
    @JoinColumn(name = "fert_id")
    private FertilizerEntity fertilizer;

	public int getFertRecId() {
		return fertRecId;
	}

	public void setFertRecId(int fertRecId) {
		this.fertRecId = fertRecId;
	}

	public float getQuantityKgPerAcre() {
		return quantityKgPerAcre;
	}

	public void setQuantityKgPerAcre(float quantityKgPerAcre) {
		this.quantityKgPerAcre = quantityKgPerAcre;
	}

	public String getInstruction() {
		return instruction;
	}

	public void setInstruction(String instruction) {
		this.instruction = instruction;
	}

	public SoilReportEntity getSoilReport() {
		return soilReport;
	}

	public void setSoilReport(SoilReportEntity soilReport) {
		this.soilReport = soilReport;
	}

	public FertilizerEntity getFertilizer() {
		return fertilizer;
	}

	public void setFertilizer(FertilizerEntity fertilizer) {
		this.fertilizer = fertilizer;
	}

	public FertilizerRecommendationEntity(int fertRecId, float quantityKgPerAcre, String instruction,
			SoilReportEntity soilReport, FertilizerEntity fertilizer) {
		super();
		this.fertRecId = fertRecId;
		this.quantityKgPerAcre = quantityKgPerAcre;
		this.instruction = instruction;
		this.soilReport = soilReport;
		this.fertilizer = fertilizer;
	}

	public FertilizerRecommendationEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    

}
