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
@Table(name = "weather_history")
public class WeatherHistoryEntity {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int weatherId;

    private float temperature;
    private float humidity;
    private float rainfall;
    private String conditions;
    private String wind;
    private LocalDateTime fetchedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

	public int getWeatherId() {
		return weatherId;
	}

	public void setWeatherId(int weatherId) {
		this.weatherId = weatherId;
	}

	public float getTemperature() {
		return temperature;
	}

	public void setTemperature(float temperature) {
		this.temperature = temperature;
	}

	public float getHumidity() {
		return humidity;
	}

	public void setHumidity(float humidity) {
		this.humidity = humidity;
	}

	public float getRainfall() {
		return rainfall;
	}

	public void setRainfall(float rainfall) {
		this.rainfall = rainfall;
	}

	public String getCondition() {
		return conditions;
	}

	public void setCondition(String conditions) {
		this.conditions = conditions;
	}

	public String getWind() {
		return wind;
	}

	public void setWind(String wind) {
		this.wind = wind;
	}

	public LocalDateTime getFetchedAt() {
		return fetchedAt;
	}

	public void setFetchedAt(LocalDateTime fetchedAt) {
		this.fetchedAt = fetchedAt;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public WeatherHistoryEntity(int weatherId, float temperature, float humidity, float rainfall, String conditions,
			String wind, LocalDateTime fetchedAt, UserEntity user) {
		super();
		this.weatherId = weatherId;
		this.temperature = temperature;
		this.humidity = humidity;
		this.rainfall = rainfall;
		this.conditions = conditions;
		this.wind = wind;
		this.fetchedAt = fetchedAt;
		this.user = user;
	}

	public WeatherHistoryEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    

}
