package com.example.demo.controller;

import com.example.demo.model.Donation;
import com.example.demo.service.DonationService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "*") // Allow React frontend to access
public class DonationController {

    @Autowired
    private DonationService donationService;

    // ✅ Ensure uploads directory is inside the backend folder dynamically
    private static final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads" + File.separator;

    // ✅ Automatically create the folder when the application starts
    @PostConstruct
    public void init() {
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
            System.out.println("✅ Upload directory created at: " + UPLOAD_DIR);
        }
    }

    // ✅ Add new donation with image upload
    @PostMapping("/add")
    public ResponseEntity<Donation> addDonation(
            @RequestParam("foodType") String foodType,
            @RequestParam("quantity") double quantity,
            @RequestParam("pickupAddress") String pickupAddress,
            @RequestParam("pickupTime") String pickupTime,
            @RequestParam(value = "expirationDate", required = false) String expirationDate,
            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

        String imageUrl = null;
        if (file != null && !file.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String filePath = UPLOAD_DIR + fileName;
            file.transferTo(new File(filePath));
            imageUrl = fileName; // ✅ Save only filename, not full path
        }

        Donation donation = new Donation();
        donation.setFoodType(foodType);
        donation.setQuantity(quantity);
        donation.setPickupAddress(pickupAddress);
        donation.setPickupTime(pickupTime);
        donation.setExpirationDate(expirationDate);
        donation.setImageUrl(imageUrl);
        donation.setStatus("Pending"); // Default status

        Donation savedDonation = donationService.saveDonation(donation);
        return ResponseEntity.ok(savedDonation);
    }

    // ✅ Fetch all donations with full image URL
    @GetMapping("/all")
    public ResponseEntity<List<Donation>> getAllDonations() {
        List<Donation> donations = donationService.getAllDonations();
        donations.forEach(donation -> {
            if (donation.getImageUrl() != null) {
                donation.setImageUrl("http://localhost:8080/api/donations/image/" + donation.getImageUrl());
            }
        });
        return ResponseEntity.ok(donations);
    }

    // ✅ Fetch only pending donations with full image URL
    @GetMapping("/pending")
    public ResponseEntity<List<Donation>> getPendingDonations() {
        List<Donation> pendingDonations = donationService.getPendingDonations();
        pendingDonations.forEach(donation -> {
            if (donation.getImageUrl() != null) {
                donation.setImageUrl("http://localhost:8080/api/donations/image/" + donation.getImageUrl());
            }
        });
        return ResponseEntity.ok(pendingDonations);
    }

    // ✅ Update status of a donation (Pending, Rejected, Completed)
    @PutMapping("/update-status/{id}")
    public ResponseEntity<Donation> updateStatus(@PathVariable Long id, @RequestParam("status") String status) {
        Optional<Donation> optionalDonation = donationService.getDonationById(id);
        if (optionalDonation.isPresent()) {
            Donation donation = optionalDonation.get();
            donation.setStatus(status);
            Donation updatedDonation = donationService.saveDonation(donation);
            return ResponseEntity.ok(updatedDonation);
        }
        return ResponseEntity.notFound().build();
    }

    // ✅ Retrieve image correctly (serves from backend)
    @GetMapping("/image/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        File file = Paths.get(UPLOAD_DIR, filename).toFile();
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(file);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_JPEG_VALUE) // Change if using PNG
                .body(resource);
    }

    // ✅ Delete donation by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDonation(@PathVariable Long id) {
        donationService.deleteDonation(id);
        return ResponseEntity.ok("Donation deleted successfully!");
    }
}
