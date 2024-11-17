package edu.oregonstate.engr.classwork.backend.controllers;

import edu.oregonstate.engr.classwork.backend.models.Material;
import edu.oregonstate.engr.classwork.backend.services.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController//combines Controller + ResponseBody annotations
@RequestMapping("/materials")
@CrossOrigin(origins={"http://classwork.engr.oregonstate.edu:14571", "http://localhost:14571"})
public class MaterialController {
    private final MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

    @GetMapping
    public ResponseEntity<List<Material>> getAllMaterials() {
        List<Material> materials = materialService.getAllMaterials();
        return ResponseEntity.ok(materials);
    }

    @PostMapping
    public ResponseEntity<Material> createMaterial(@Validated @RequestBody Material material) {
        Material createdMaterial = materialService.createMaterial(material);
        return ResponseEntity.ok(createdMaterial);
    }

    @PutMapping
    public ResponseEntity<Material> updateMaterial(@Validated @RequestBody Material material) {
        Material updatedMaterial = materialService.updateMaterial(material);
        return ResponseEntity.ok(updatedMaterial);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMaterial(@RequestParam int material_id) {
        materialService.deleteMaterial(material_id);
        return ResponseEntity.noContent().build();
    }
}