package com.example_Backend.DTO;

import java.time.LocalDateTime;

import com.example_Backend.Entity.UserEntity;



public class BlogPostDTO {
	
    private int postId;

    private String title;

    
    private String content;
    
    private String Category;
    private String tags;
    private String img;

    private int likes;
    private LocalDateTime createdAt;

 
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


	public String getCategory() {
		return Category;
	}


	public void setCategory(String category) {
		Category = category;
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


	public BlogPostDTO(int postId, String title, String content, String category, String tags, String img, int likes,
			LocalDateTime createdAt, UserEntity user) {
		super();
		this.postId = postId;
		this.title = title;
		this.content = content;
		Category = category;
		this.tags = tags;
		this.img = img;
		this.likes = likes;
		this.createdAt = createdAt;
		this.user = user;
	}


	public BlogPostDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
    
    

}
