package com.example_Backend.Controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example_Backend.DTO.BlogPostDTO;
import com.example_Backend.Entity.BlogCommentEntity;
import com.example_Backend.Entity.BlogPostEntity;
import com.example_Backend.entityServices.BlogServices;



@RestController
@RequestMapping( "/blog" )
public class blogController {
	
	@Autowired
	BlogServices blogServices;
	
//	@PostMapping( value ="/createBlog"
//			)
//	public BlogPostEntity createBlog(@RequestBody BlogPostEntity blog , @RequestParam("email")  String email) {
//		return this.blogServices.createBlog(blog, email);
//	}
//	
	
	@PostMapping("/createBlog")
	public BlogPostDTO createBlog(
	        @RequestBody BlogPostDTO blogDto,
	        @RequestParam String email) {

	    return blogServices.createBlog(blogDto, email);
	}
	
	
	
	@GetMapping("/getbyid/{user_id}")
	public BlogPostEntity getpostById(@PathVariable("user_id") int id) {
		return this.blogServices.getpostById(id);
	}
	
	
	@PutMapping("/update/{id}")
	public BlogPostEntity updateUser(@PathVariable("id") int id, @RequestBody BlogPostEntity newUser) {
	   return this.blogServices.updateUser(id, newUser);
	}
	
	@DeleteMapping("/deleteuser/{id}")
	public boolean deletepost(@PathVariable("id") int id) {
		
	    return this.blogServices.deletepost(id);
	}
	
	/// 
	@DeleteMapping
	public boolean deleteALLpost() {
		return this.blogServices.deleteALLpost();
	}
	
	@GetMapping
	public List<BlogPostEntity> findall(){
		return this.blogServices.findall();
	}
	
	@GetMapping("/getbyuserid/{user_id}")
	public List<BlogPostEntity> findallacodinguser(@PathVariable("user_id") int user_id){
		return this.blogServices.findallbyuser(user_id);
	}
	
	
	/// blog Comment;
	///
	
	@PostMapping("/createdcomment/{id}")
	public BlogCommentEntity createdcommentbyid(@RequestBody BlogCommentEntity blogCommentEntity, @PathVariable int id) {
		
		return this.blogServices.createComment(blogCommentEntity,id);
	}
	
	@GetMapping("/getCommentbyid/{id}")
	public BlogCommentEntity getComentById(@PathVariable("id") int id ) {
	    return this.blogServices.getComentById(id);
	}
	
	
	
	@DeleteMapping("/deletedcomment/{id}")
	public boolean  deleteComment(@PathVariable("id") int id) {
		
	    return this.blogServices.deleteComment(id);
	}
	
	@DeleteMapping("/deletedallComment") 
	public boolean deleteALL() {
		
		return this.blogServices.deleteALL();
	}
	
	
	
	@GetMapping("/getallCommmentEntity")
	public List<BlogCommentEntity> findalluser(){
		return this.blogServices.findallCommentEntity();
	}
	
	@GetMapping("/getallcommentbypostid/{id}")
	public List<BlogCommentEntity> findallcommentbypostid(@PathVariable("id") int id){
		
		return this.blogServices.findcommentbypostid(id);
				
	}
	
	
	
	
	
	
	

}
