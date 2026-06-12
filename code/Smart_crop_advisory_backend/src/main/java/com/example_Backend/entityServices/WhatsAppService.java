package com.example_Backend.entityServices;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WhatsAppService {
	
	
	@Value("${whatsapp.api.url}")
    private String apiUrl;

    @Value("${whatsapp.phone.id}")
    private String phoneId;

    @Value("${whatsapp.token}")
    private String token;
    
    
    public void sendTextMessage(String to, String message) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        String body = """
        	    {
        	      "messaging_product": "whatsapp",
        	      "to": "%s",
        	      "type": "template",
        	      "template": {
        	        "name": "your_template_name",
        	        "language": { "code": "en_US" },
        	        "components": [
        	          {
        	            "type": "body",
        	            "parameters": [
        	              { "type": "text", "text": "%s" }
        	            ]
        	          }
        	        ]
        	      }
        	    }
        	    """.formatted(to, message);

        HttpEntity<String> request = new HttpEntity<>(body, headers);

        restTemplate.postForObject(
            apiUrl + "/" + phoneId + "/messages",
            request,
            String.class
        );
    }

    
    
 

}
