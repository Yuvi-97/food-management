package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String foodType;
    private double quantity;
    private String pickupAddress;
    private String pickupTime;
    private String expirationDate;
    private String status; // "Pending", "Received"
    
    private String imageUrl; // Stores image file path

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private Receiver receiver; // Stores receiver details (optional)
}
