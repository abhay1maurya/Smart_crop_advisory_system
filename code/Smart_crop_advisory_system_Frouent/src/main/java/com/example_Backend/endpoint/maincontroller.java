package com.example_Backend.endpoint;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example_Backend.entity.BlogPostEntity;
import com.example_Backend.entity.UserEntity;
import com.example_Backend.repository.EmailService;
import com.example_Backend.repository.FeignClientconfig;

import jakarta.servlet.http.HttpSession;

import java.security.SecureRandom;

@Controller
public class maincontroller {
	
	@Autowired
	FeignClientconfig backendserver;
	
	
	  @Autowired
	  private EmailService emailService;
	
	@GetMapping("/")
	public String homepage(Principal pri , Model mo) {
		String username=pri != null ? pri.getName() : null;
		mo.addAttribute("username" , username);
		return "index";
	}
	
	
	
	
	
	
	
	@PostMapping("/generatedOtp")
	@ResponseBody
	public Map<String, String> generateOtp(
	        @ModelAttribute UserEntity userentiy,
	        HttpSession session) {

	    if (userentiy.getEmail() == null || userentiy.getEmail().isBlank()) {
	        return Map.of("status", "EMAIL_NULL");
	    }

	    SecureRandom random = new SecureRandom();
	    int otp = 1000 + random.nextInt(9000);

	    // ✅ SAVE OTP IN ENTITY
	    userentiy.setOtp(otp);
	    userentiy.setRole("USER");

	    // send mail
	    emailService.sendRegistrationEmail(
	            userentiy.getEmail(), otp, userentiy.getPasswordHash());

	    // save user
	    UserEntity user = backendserver.createUser(userentiy);

	    return Map.of(
	            "status", "OTP_SENT",
	            "userid", String.valueOf(user.getUserId())
	    );
	}

	
	@PostMapping("/verifyOtp")
	@ResponseBody
	public Map<String, String> verifyOtp(
	        @RequestParam("userid") int userid,
	        @RequestParam("userotp") String userotp) {

	    UserEntity user = backendserver.getUserById(userid);

	    if (user == null) {
	        return Map.of("status", "INVALID");
	    }

	    int savedOtp = user.getOtp();

	    // ✅ CORRECT OTP CHECK
	    if (String.valueOf(savedOtp).equals(userotp)) {
	        return Map.of("status", "VERIFIED");
	    } else {
	        return Map.of("status", "INVALID");
	    }
	}

	
	
	@PostMapping("/sussregister")
	@ResponseBody
	public String sussregister(@ModelAttribute UserEntity userEntity) {
		
		UserEntity u=this.backendserver.updateUser(userEntity.getUserId(), userEntity);
	    return "done"+u.toString();
	}
	
	
	
	
	

	
	
	

	
	@GetMapping("/kisanchatbot")
	public String kisanchatbot() {
		return "multilingualchatbot";
	}
	
	
	
	
	@GetMapping("/login")
	public String login() {
		return "login";
	}
	
	@GetMapping("/signup")
	public String signup() {
		return  "signup";
	}
	
	
	
	@GetMapping("/crop")	
	public String crop() {
		return "crop";
	}
	@GetMapping("/fertilizer")	
	public String fertilizer() {
		return "fertilizer";
	}
	@GetMapping("/disease")	
	public String disease() {
		return "disease";
	}
	@GetMapping("/team")	
	public String team() {
		return "team";
	}
	@GetMapping("/term")	
	public String term() {
		return "term";
	}

}
