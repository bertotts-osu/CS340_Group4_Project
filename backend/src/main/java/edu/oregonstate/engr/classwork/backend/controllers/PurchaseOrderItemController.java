package edu.oregonstate.engr.classwork.backend.controllers;

import edu.oregonstate.engr.classwork.backend.models.PurchaseOrderItem;
import edu.oregonstate.engr.classwork.backend.services.PurchaseOrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController//combines Controller + ResponseBody annotations
@RequestMapping("/purchase-order-items")
@CrossOrigin(origins = "*") // enables requests to be sent from any origin
public class PurchaseOrderItemController {

    private final PurchaseOrderItemService purchaseOrderItemService;

    @Autowired // constructor injection
    public PurchaseOrderItemController(PurchaseOrderItemService purchaseOrderItemService) {
        this.purchaseOrderItemService = purchaseOrderItemService;
    }

    @GetMapping
    public ResponseEntity<List<PurchaseOrderItem>> getAllPurchaseOrderItems() {
        List<PurchaseOrderItem> purchaseOrders = purchaseOrderItemService.getAllPurchaseOrderItems();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(purchaseOrders);
    }

    @PostMapping
    public ResponseEntity<PurchaseOrderItem> createPurchaseOrderItem(@RequestBody PurchaseOrderItem purchaseOrderItem) {
        PurchaseOrderItem createdPurchaseOrderItem = purchaseOrderItemService.createPurchaseOrderItem(purchaseOrderItem);
        return ResponseEntity.ok(createdPurchaseOrderItem);
    }
}