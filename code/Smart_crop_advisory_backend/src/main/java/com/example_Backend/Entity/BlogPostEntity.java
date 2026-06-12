package com.example_Backend.Entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "blog_post")
public class BlogPostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postId;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;
    
    private String category;
    private String tags;
    private String img;

    private int likes;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
   
    @JsonManagedReference
    
    private UserEntity user;

	public int getPostId() {
		return postId;
	}

	public void setPostId(int postId) {
		this.postId = postId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getLikes() {
		return likes;
	}

	public void setLikes(int likes) {
		this.likes = likes;
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
	
	


	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}
	
	
	

	
	

	public BlogPostEntity(int postId, String title, String content, String category, String tags, String img, int likes,
			LocalDateTime createdAt, UserEntity user) {
		super();
		this.postId = postId;
		this.title = title;
		this.content = content;
		this.category = category;
		this.tags = tags;
		this.img = img;
		this.likes = likes;
		this.createdAt = createdAt;
		this.user = user;
	}

	public BlogPostEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    

}
