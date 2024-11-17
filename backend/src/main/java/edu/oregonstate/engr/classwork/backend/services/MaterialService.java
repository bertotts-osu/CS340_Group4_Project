package edu.oregonstate.engr.classwork.backend.services;

import edu.oregonstate.engr.classwork.backend.models.Material;
import edu.oregonstate.engr.classwork.backend.repositories.MaterialRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialService {
    private final MaterialRepository materialRepository;

    public MaterialService(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    public List<Material> getAllMaterials() {
        return materialRepository.getAll();
    }

    public void createMaterial(Material material) {
        materialRepository.insert(material);
    }

    public void updateMaterial(Material material) {
        materialRepository.update(material);
    }

    public void deleteMaterial(int material_id) {
        materialRepository.delete(material_id);
    }
}