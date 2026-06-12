package com.example_Backend.entityServices;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example_Backend.DTO.BlogPostDTO;
import com.example_Backend.Entity.BlogCommentEntity;
import com.example_Backend.Entity.BlogPostEntity;
import com.example_Backend.Entity.UserEntity;
import com.example_Backend.Repository.BlogCommentRepository;
import com.example_Backend.Repository.BlogReailCommentRepositoy;
import com.example_Backend.Repository.UserRepository;

@Service
public class BlogServices {
	@Autowired
	BlogCommentRepository Blogpost;
	
	@Autowired
	BlogReailCommentRepositoy Blogpostcomment;
	
	@Autowired
	UserServices userServices;
	
	
	@Autowired
	UserRepository userrepo;
	public BlogPostEntity createBlog(BlogPostEntity blog , String email) {
		
			UserEntity user=this.userrepo.findByEmail(email).orElse(null);
			if(user==null) {
				return null;
			}
			blog.setUser(user);
			blog.setCreatedAt(LocalDateTime.now());
		
	     return  Blogpost.save(blog);
	}
	
	
	public BlogPostDTO createBlog(BlogPostDTO dto, String email) {

	    UserEntity user = this.userrepo.findByEmail(email).orElse(null);
	    if(user==null) {
			return null;
		}

	    BlogPostEntity blog = new BlogPostEntity();
	    blog.setTitle(dto.getTitle());
	    blog.setContent(dto.getContent());
	    blog.setCategory(dto.getCategory());
	    blog.setTags(dto.getTags());
	    blog.setImg(dto.getImg());
	    blog.setLikes(0);
	    blog.setCreatedAt(LocalDateTime.now());
	    blog.setUser(user);

	    BlogPostEntity saved = Blogpost.save(blog);

	    BlogPostDTO response = new BlogPostDTO();
	    response.setPostId(saved.getPostId());
	    response.setTitle(saved.getTitle());
	    response.setContent(saved.getContent());
	    response.setCategory(saved.getCategory());
	    response.setTags(saved.getTags());
	    response.setImg(saved.getImg());
	    response.setLikes(saved.getLikes());
	    response.setCreatedAt(saved.getCreatedAt());
	    response.setUser(saved.getUser());

	    return response;
	}

	
	
	
	
	
	public BlogPostEntity getpostById(int id) {
	    return this.Blogpost.findById(id).orElse(null);
	}
	
	
	public BlogPostEntity updateUser(int id, BlogPostEntity newUser) {
	    BlogPostEntity old = this.Blogpost.findById(id).orElse(null);
	    if(old==null) {
	    	return null;
	    }
	    else {
	    	if(newUser.getContent()!=null) {
	    		old.setContent(newUser.getContent());
	    	}
	    	if(newUser.getTitle()!=null) {
	    		old.setTitle(newUser.getTitle());
	    	}
	    	if(newUser.getImg()!=null) {
	    		old.setImg(newUser.getImg());
	    	}
	    	
	 
	    	
	    }
	    return this.Blogpost.save(old);
	}
	
	public boolean deletepost(int id) {
		try {
			BlogPostEntity user=this.Blogpost.findById(id).orElse(null);
			if(user==null) {
				return false;
			}
			this.Blogpost.delete(user);
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			
		}
		return false;
	    
	}
	
	/// 
	public boolean deleteALLpost() {
		try {
			this.Blogpost.deleteAll();
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			
		}
		return false;
	}
	
	public List<BlogPostEntity> findall(){
		return this.Blogpost.findAll();
	}
	
	
	
	public List<BlogPostEntity> findallbyuser(int id){
		UserEntity user=this.userServices.getUserById(id);
		return this.Blogpost.findByUser(user);
	}
	
	
	/// blog Comment;
	
	
	public BlogCommentEntity createComment(BlogCommentEntity Comment , int id ) {
		BlogPostEntity blogpost =this.Blogpost.findById(id).orElse(null);
		if(blogpost==null) {
			return null;
		}
		Comment.setUser(null);
		Comment.setBlogPost(blogpost);
	     return  this.Blogpostcomment.save(Comment);
	}
	
	
	public BlogCommentEntity getComentById(int id) {
	    return this.Blogpostcomment.findById(id).orElse(null);
	}
	
	
	
	
	public boolean  deleteComment(int id) {
		try {
			BlogCommentEntity user=this.Blogpostcomment.findById(id).orElse(null);
			if(user==null) {
				return false;
			}
			this.Blogpostcomment.delete(user);
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			
		}
		return false;
	    
	}
	
	/// 
	public boolean deleteALL() {
		try {
			this.Blogpostcomment.deleteAll();
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			
		}
		return false;
	}
	
	public List<BlogCommentEntity> findallCommentEntity(){
		return this.Blogpostcomment.findAll();
	}
	
	public List<BlogCommentEntity> findcommentbypostid(int id){
		 BlogPostEntity blog=this.Blogpost.findById(id).orElse(null);
		return this.Blogpostcomment.findByBlogPost(blog);
	}
	
	

}
