package com.example_Backend.entityServices;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class WhatsAppServiceTwilio {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.whatsapp.from}")
    private String fromNumber;

    @PostConstruct
    public void init() {
        Twilio.init(accountSid, authToken);
        System.out.println("✅ Twilio Initialized");
    }

    public String sendTextMessage(String to, String text) {

        Message message = Message.creator(
        		new PhoneNumber("whatsapp:" + to),
                new PhoneNumber("whatsapp:+14155238886"),
                text
        ).create();

        return message.getSid();
    }
}