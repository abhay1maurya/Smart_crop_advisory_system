package com.example_Backend.Controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example_Backend.AiServices.chatcClientservices;
import com.example_Backend.entityServices.WhatsAppService;
import com.example_Backend.entityServices.WhatsAppServiceTwilio;



@RestController
@RequestMapping("/whatsapp")
public class WhatsAppAlert {	
	
	@Autowired
	private WhatsAppService whatsAppService;
	
	@Autowired
	chatcClientservices ChatClient;
	
	
	@Autowired
	private  WhatsAppServiceTwilio twilioService;
	
	
	 @PostMapping("/send")
	 public String sendMessage(@RequestParam("lange") String lang ) {
		 	String message=this.ChatClient.Diseasealert(lang,"null");
	        whatsAppService.sendTextMessage("917055417849",  message);
	        return "WhatsApp message sent successfully"+message;
	    }
	 
	 
	 
	 
	 @PostMapping("/sandbox/join")
	 public Map<String, String> sandboxJoinInstruction() {

	     Map<String, String> response = new HashMap<>();

	     response.put("message",
	             "📲 WhatsApp Sandbox Join Required\n\n"
	           + "1️⃣ Open WhatsApp\n"
	           + "2️⃣ Send this message:\n\n"
	           + "join brother-exercise\n\n"
	           + "📞 To number: +14155238886\n\n"
	           + "After joining, you will receive messages."
	     );

	     // 👇 WhatsApp chat auto-open link
	     response.put(
	         "whatsappUrl",
	         "https://wa.me/14155238886?text=join%20brother-exercise"
	     );

	     return response;
	 }

	 
	 
	 

	 @PostMapping("/sendmess")
	 public String sendMessages(
	         @RequestParam("lange") String lang,
	         @RequestParam String city,
	         @RequestParam String phone   // 👈 dynamic number
	 ) {

	     String message = this.ChatClient.Diseasealert(lang, city);
	     String phon="+91" + phone;

	     try {
	         String sid = twilioService.sendTextMessage(phon, message);
	         return "✅ WhatsApp message sent | SID: " + sid;
	     } catch (Exception e) {
	         return "❌ Number not joined WhatsApp Sandbox. Please join first.";
	     }
	 }
	 
	 
	 
	
}
