package com.example_Backend.entity;

import java.time.LocalDateTime;

public class BlogPostEntity {
	

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


	@Override
	public String toString() {
		return "BlogPostEntity [postId=" + postId + ", title=" + title + ", content=" + content + ", Category="
				+ Category + ", tags=" + tags + ", img=" + img + ", likes=" + likes + ", createdAt=" + createdAt
				+ ", user=" + user + "]";
	}
	
	
    
    
    
    
    

}
