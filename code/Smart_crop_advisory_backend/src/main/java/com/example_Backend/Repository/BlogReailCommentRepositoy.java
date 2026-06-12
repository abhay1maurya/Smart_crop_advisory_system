package com.example_Backend.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example_Backend.Entity.BlogCommentEntity;
import com.example_Backend.Entity.BlogPostEntity;
import com.example_Backend.Entity.UserEntity;

import java.util.List;
import java.util.Optional;


@Repository
public interface BlogReailCommentRepositoy extends JpaRepository<BlogCommentEntity, Integer> {
	
	Optional<BlogCommentEntity> findByUser(UserEntity user);
	List<BlogCommentEntity> findByBlogPost(BlogPostEntity blogPost);
	
}
