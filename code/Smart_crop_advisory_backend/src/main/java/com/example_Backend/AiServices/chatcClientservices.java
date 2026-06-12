package com.example_Backend.AiServices;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;

@Service
public class chatcClientservices {
	
    private final  ChatClient chatclient;

	public chatcClientservices(ChatClient.Builder builder) {
		this.chatclient=builder.build();

	}
	
	public String ask(String message) {
		return this.chatclient.prompt()
				 .system("""
						    You are an Agriculture Assistant for Indian farming only.
						    You must answer only agriculture questions.
						    If the question is not related to agriculture, reply:
						    "I only answer agriculture-related questions."
						    """)
				.user(message)
				.call()
				.content();
	}
	
	
	public Flux<String> Streemchat(String mess){
		return this.chatclient.prompt().system("You are an agriculture expert. Answer using Indian farming conditions.").user(mess).stream().content();
	}
	
	
public String Diseasealert(String language, String city) {

	    String prompt = """
	        You are an AI assistant for an Indian Smart Crop Advisory System.

	        Generate a WhatsApp alert for Indian farmers.

	        Location:
	        - City/District: %s (India)

	        Requirements:
	        - Agriculture-related
	        - Disease outbreak OR severe weather
	        - Based on crops commonly grown near %s
	        - Consider local climate and seasonal risks

	        Include:
	        • Current problem in the area
	        • What may happen in the coming days
	        • Preventive advice for farmers

	        Language: %s

	        Rules:
	        - Simple farmer-friendly words
	        - WhatsApp message style
	        - 4–6 short lines
	        - Use emojis (🌾🌧️🐛⚠️)
	        """.formatted(city, city, language);

	    return this.chatclient.prompt()
	            .user(prompt)
	            .call()
	            .content();
	}

	
	

}
