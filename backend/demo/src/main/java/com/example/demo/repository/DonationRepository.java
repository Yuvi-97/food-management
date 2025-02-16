package com.example.demo.repository;
import com.example.demo.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findByStatus(String status); // Fetch donations by status
}
