package com.example.demo.Auth;
import lombok.Data;      
@Data
public class SignupRequest {
    private String email;
    private String password;
    private String fullName;
    private String phone;
    private String role;
}
