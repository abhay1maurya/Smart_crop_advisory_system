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
@Table(name = "chatbot_conversation")
public class ChatbotConversationEntity {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // -------- PROMPT SECTION --------
    @Column(columnDefinition = "TEXT")
    private String promptText;

    private String promptImageUrl;

    private String promptAudioUrl;

    // -------- ANSWER SECTION --------
    @Column(columnDefinition = "TEXT")
    private String answerText;

    private String answerImageUrl;

    private String answerAudioUrl;

    // -------- TIME --------
    private LocalDateTime createdAt = LocalDateTime.now();

    // -------- USER RELATION --------
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPromptText() {
		return promptText;
	}

	public void setPromptText(String promptText) {
		this.promptText = promptText;
	}

	public String getPromptImageUrl() {
		return promptImageUrl;
	}

	public void setPromptImageUrl(String promptImageUrl) {
		this.promptImageUrl = promptImageUrl;
	}

	public String getPromptAudioUrl() {
		return promptAudioUrl;
	}

	public void setPromptAudioUrl(String promptAudioUrl) {
		this.promptAudioUrl = promptAudioUrl;
	}

	public String getAnswerText() {
		return answerText;
	}

	public void setAnswerText(String answerText) {
		this.answerText = answerText;
	}

	public String getAnswerImageUrl() {
		return answerImageUrl;
	}

	public void setAnswerImageUrl(String answerImageUrl) {
		this.answerImageUrl = answerImageUrl;
	}

	public String getAnswerAudioUrl() {
		return answerAudioUrl;
	}

	public void setAnswerAudioUrl(String answerAudioUrl) {
		this.answerAudioUrl = answerAudioUrl;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public ChatbotConversationEntity(Long id, String promptText, String promptImageUrl, String promptAudioUrl,
			String answerText, String answerImageUrl, String answerAudioUrl, LocalDateTime createdAt, UserEntity user) {
		super();
		this.id = id;
		this.promptText = promptText;
		this.promptImageUrl = promptImageUrl;
		this.promptAudioUrl = promptAudioUrl;
		this.answerText = answerText;
		this.answerImageUrl = answerImageUrl;
		this.answerAudioUrl = answerAudioUrl;
		this.createdAt = createdAt;
		this.user = user;
	}

	public ChatbotConversationEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    

	

}
