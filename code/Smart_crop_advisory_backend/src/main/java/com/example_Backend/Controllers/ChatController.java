package com.example_Backend.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example_Backend.AiServices.chatcClientservices;

import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/ai")
//@CrossOrigin(origins = "http://127.0.0.1:5500/frontend/multilingualchatbot.html")
public class ChatController {
	
	@Autowired
	chatcClientservices ChatClient;
	
	
//////	You are an agriculture expert. Answer using Indian farming conditions.
	@GetMapping("/demo")
	public String agricultureAI(@RequestParam ("q") String question) {
		return ChatClient.ask(question);
	}
	
	@GetMapping("/ask")
	public Flux<String> steemchat(@RequestParam ("q") String question){
		return ChatClient.Streemchat(question);
	}
	
	@GetMapping("/alert")
	public String agricultureAIalert(@RequestParam ("lang") String lange , @RequestParam ("city") String city) {
		return ChatClient.Diseasealert(lange,city);
	}
	

}
