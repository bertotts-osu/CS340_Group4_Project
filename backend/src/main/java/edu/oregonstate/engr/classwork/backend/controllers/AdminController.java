package edu.oregonstate.engr.classwork.backend.controllers;

import edu.oregonstate.engr.classwork.backend.repositories.AdminDbUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController//combines Controller + ResponseBody annotations
@RequestMapping("/admin")
@CrossOrigin(origins = {"http://classwork.engr.oregonstate.edu:14571", "http://localhost:14571"})
public class AdminController {
    private final AdminDbUtil adminDbUtil;

    public AdminController(AdminDbUtil adminDbUtil) {
        this.adminDbUtil = adminDbUtil;
    }

    @PostMapping("/reset-db")
    public ResponseEntity<Void> resetDb() {
        adminDbUtil.resetDb();
        return ResponseEntity.ok().build();
    }
}
