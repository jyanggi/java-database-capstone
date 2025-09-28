package com.project.back_end.mvc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.project.back_end.service.TokenValidationService; // adjust to your actual service package
import java.util.Map;

@Controller
public class DashboardController {

    // 2. Autowire the Shared Service:
    //    - This service provides the token validation logic.
    @Autowired
    private TokenValidationService tokenValidationService;

    // 3. Admin Dashboard Endpoint
    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {
        Map<String, Object> errors = tokenValidationService.validateToken(token, "admin");

        // If token is valid (no errors), forward to admin dashboard view
        if (errors.isEmpty()) {
            return "admin/adminDashboard"; // Thymeleaf template at src/main/resources/templates/admin/adminDashboard.html
        }

        // If invalid, redirect to login page
        return "redirect:http://localhost:8080";
    }

    // 4. Doctor Dashboard Endpoint
    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {
        Map<String, Object> errors = tokenValidationService.validateToken(token, "doctor");

        // If token is valid, forward to doctor dashboard view
        if (errors.isEmpty()) {
            return "doctor/doctorDashboard"; // Thymeleaf template at src/main/resources/templates/doctor/doctorDashboard.html
        }

        // If invalid, redirect to login page
        return "redirect:http://localhost:8080";
    }
}
