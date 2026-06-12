package com.example_Backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendRegistrationEmail(String toEmail, int OTP, String password) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("shanuahmed03@gmail.com"); // ✅ REQUIRED LINE
        message.setTo(toEmail);
        message.setSubject("Welcome to KrishiSahayak – Registration Successful");
        message.setText(
                "Hello User,\n\n" +
                "Your account has been successfully created.\n\n" +
                "Username: " + toEmail + "\n" +
                "Password: " + password + "\n\n" +
                "OTP: " + OTP + "\n\n" +
                "Please keep your credentials secure.\n\n" +
                "Regards,\nKrishiSahayak Team"
        );

        mailSender.send(message);
    }
}
