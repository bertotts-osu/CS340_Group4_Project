package edu.oregonstate.engr.classwork.backend.services;
import edu.oregonstate.engr.classwork.backend.models.Material;
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
}