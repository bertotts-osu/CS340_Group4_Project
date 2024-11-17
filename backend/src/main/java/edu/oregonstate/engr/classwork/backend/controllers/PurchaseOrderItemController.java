package edu.oregonstate.engr.classwork.backend.controllers;

import edu.oregonstate.engr.classwork.backend.models.PurchaseOrderItem;
import edu.oregonstate.engr.classwork.backend.services.PurchaseOrderItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController//combines Controller + ResponseBody annotations
@RequestMapping("/purchase-order-items")
@CrossOrigin(origins = {"http://classwork.engr.oregonstate.edu:14571", "http://localhost:14571"})
public class PurchaseOrderItemController {
    private final PurchaseOrderItemService purchaseOrderItemService;

    public PurchaseOrderItemController(PurchaseOrderItemService purchaseOrderItemService) {
        this.purchaseOrderItemService = purchaseOrderItemService;
    }

    @GetMapping
    public ResponseEntity<List<PurchaseOrderItem>> getAllPurchaseOrderItems() {
        List<PurchaseOrderItem> purchaseOrderItems = purchaseOrderItemService.getAllPurchaseOrderItems();
        return ResponseEntity.ok(purchaseOrderItems);
    }

    @PostMapping
    public ResponseEntity<PurchaseOrderItem> createPurchaseOrderItem(@Validated @RequestBody PurchaseOrderItem purchaseOrderItem) {
        PurchaseOrderItem createdPurchaseOrderItem = purchaseOrderItemService.createPurchaseOrderItem(purchaseOrderItem);
        return ResponseEntity.ok(createdPurchaseOrderItem);
    }


    @PutMapping
    public ResponseEntity<PurchaseOrderItem> updatePurchaseOrderItem(@Validated @RequestBody PurchaseOrderItem purchaseOrderItem) {
        PurchaseOrderItem updatePurchaseOrderItem = purchaseOrderItemService.updatePurchaseOrderItem(purchaseOrderItem);
        return ResponseEntity.ok(updatePurchaseOrderItem);
    }

    @DeleteMapping
    public ResponseEntity<Void> deletePurchaseOrder(@RequestParam int purchase_order_item_id) {
        purchaseOrderItemService.deletePurchaseOrderItem(purchase_order_item_id);
        return ResponseEntity.noContent().build();
    }
}