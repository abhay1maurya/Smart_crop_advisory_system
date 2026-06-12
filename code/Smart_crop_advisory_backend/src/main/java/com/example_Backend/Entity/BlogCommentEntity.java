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
@Table(name = "blog_comment")
public class BlogCommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentId;

    @Column(columnDefinition = "TEXT")
    private String comment;

    private LocalDateTime commentedAt;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private BlogPostEntity blogPost;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

	public int getCommentId() {
		return commentId;
	}

	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public LocalDateTime getCommentedAt() {
		return commentedAt;
	}

	public void setCommentedAt(LocalDateTime commentedAt) {
		this.commentedAt = commentedAt;
	}

	public BlogPostEntity getBlogPost() {
		return blogPost;
	}

	public void setBlogPost(BlogPostEntity blogPost) {
		this.blogPost = blogPost;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public BlogCommentEntity(int commentId, String comment, LocalDateTime commentedAt, BlogPostEntity blogPost,
			UserEntity user) {
		super();
		this.commentId = commentId;
		this.comment = comment;
		this.commentedAt = commentedAt;
		this.blogPost = blogPost;
		this.user = user;
	}

	public BlogCommentEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    

}
