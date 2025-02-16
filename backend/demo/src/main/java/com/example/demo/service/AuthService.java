package com.example.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.Auth.*;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String registerUser(SignupRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            return "User already exists!";
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Encrypt Password
        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setRole(request.getRole());

        userRepository.save(user);
        return "User registered successfully!";
    }

    public String loginUser(LoginRequest request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());

        if (user.isPresent() && passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {
            return "Login successful! Role: " + user.get().getRole();
        } else {
            return "Invalid email or password!";
        }
    }
}
