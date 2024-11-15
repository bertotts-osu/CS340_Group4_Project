package edu.oregonstate.engr.classwork.backend.services;

import edu.oregonstate.engr.classwork.backend.models.Material;
import edu.oregonstate.engr.classwork.backend.models.PurchaseOrder;
import edu.oregonstate.engr.classwork.backend.repositories.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialService {
    private final MaterialRepository materialRepository;

    @Autowired
    public MaterialService(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    public List<Material> getAllMaterials() {
        return materialRepository.getAll();
    }

    public Material createMaterial(Material material) {
        int material_id = materialRepository.insert(material);
        return materialRepository.getById(material_id);
    }

    public Material updateMaterial(Material material) {
        materialRepository.update(material);
        return materialRepository.getById(material.getMaterial_id());
    }

    public void deleteMaterial(int material_id) {
        materialRepository.delete(material_id);
    }
}