package edu.oregonstate.engr.classwork.backend.controllers;

import edu.oregonstate.engr.classwork.backend.models.PurchaseOrderItem;
import edu.oregonstate.engr.classwork.backend.services.PurchaseOrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController//combines Controller + ResponseBody annotations
@RequestMapping("/purchase-order-items")
public class PurchaseOrderItemController {

    private final PurchaseOrderItemService purchaseOrderItemService;

    @Autowired // constructor injection
    public PurchaseOrderItemController(PurchaseOrderItemService purchaseOrderItemService) {
        this.purchaseOrderItemService = purchaseOrderItemService;
    }

    @GetMapping
    @CrossOrigin(origins = "*") // enables requests to be sent from any origin
    public ResponseEntity<List<PurchaseOrderItem>> getAllPurchaseOrderItems() {
        List<PurchaseOrderItem> purchaseOrders = purchaseOrderItemService.getAllPurchaseOrderItems();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(purchaseOrders);
    }
}