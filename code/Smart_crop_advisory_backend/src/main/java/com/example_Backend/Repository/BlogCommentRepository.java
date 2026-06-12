package com.example_Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example_Backend.Entity.BlogCommentEntity;
import com.example_Backend.Entity.BlogPostEntity;
import com.example_Backend.Entity.UserEntity;

import java.util.List;


@Repository
public interface BlogCommentRepository extends JpaRepository<BlogPostEntity, Integer> {
	
	List<BlogPostEntity> findByUser(UserEntity user);
	

}
