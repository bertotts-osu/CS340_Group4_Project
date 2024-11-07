package edu.oregonstate.engr.classwork.backend.controllers;

import edu.oregonstate.engr.classwork.backend.models.Material;
import edu.oregonstate.engr.classwork.backend.services.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController//combines Controller + ResponseBody annotations
@RequestMapping("/materials")
public class MaterialController {

    private final MaterialService materialService;

    @Autowired // constructor injection
    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

    @GetMapping
    @CrossOrigin(origins = "*") // enables requests to be sent from any origin
    public ResponseEntity<List<Material>> getAllMaterials() {
        List<Material> materials = materialService.getAllMaterials();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(materials);
    }
}
