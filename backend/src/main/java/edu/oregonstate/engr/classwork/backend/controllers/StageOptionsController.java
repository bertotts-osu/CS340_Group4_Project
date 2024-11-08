package edu.oregonstate.engr.classwork.backend.controllers;

import edu.oregonstate.engr.classwork.backend.repositories.StageOptionsRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/stages")
public class StageOptionsController {

    private final StageOptionsRepository stageOptionsRepository;

    @Autowired //constructor injection
    public StageOptionsController(StageOptionsRepository stageOptionsRepository) {
        this.stageOptionsRepository = stageOptionsRepository;
    }

    @GetMapping // maps HTTP GET requests to method
    @CrossOrigin(origins = "*") // enables requests to be sent from any origin
    public ResponseEntity<List<String>> getStages() {
        List<String> stages = stageOptionsRepository.getStages();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(stages);
    }
}