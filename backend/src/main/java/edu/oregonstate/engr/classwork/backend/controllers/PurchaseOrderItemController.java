package edu.oregonstate.engr.classwork.backend.controllers;

import edu.oregonstate.engr.classwork.backend.models.PurchaseOrderItem;
import edu.oregonstate.engr.classwork.backend.models.PurchaseOrderItem.PurchaseOrderItemWithNames;
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
    public ResponseEntity<List<PurchaseOrderItemWithNames>> getAllPurchaseOrderItems() {
        List<PurchaseOrderItemWithNames> purchaseOrderItems = purchaseOrderItemService.getAllPurchaseOrderItems();
        return ResponseEntity.ok(purchaseOrderItems);
    }

    @PostMapping
    public ResponseEntity<Void> createPurchaseOrderItem(@Validated @RequestBody PurchaseOrderItem purchaseOrderItem) {
        purchaseOrderItemService.createPurchaseOrderItem(purchaseOrderItem);
        return ResponseEntity.ok().build();
    }


    @PutMapping
    public ResponseEntity<Void> updatePurchaseOrderItem(@Validated @RequestBody PurchaseOrderItem purchaseOrderItem) {
        purchaseOrderItemService.updatePurchaseOrderItem(purchaseOrderItem);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deletePurchaseOrder(@RequestParam int purchase_order_item_id) {
        purchaseOrderItemService.deletePurchaseOrderItem(purchase_order_item_id);
        return ResponseEntity.noContent().build();
    }
}