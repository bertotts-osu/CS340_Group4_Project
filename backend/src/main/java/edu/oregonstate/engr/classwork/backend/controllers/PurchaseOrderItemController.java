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
@CrossOrigin(origins={"http://classwork.engr.oregonstate.edu:14571", "http://localhost:14571"})
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

//    @PostMapping
//    public ResponseEntity<PurchaseOrderItem> createPurchaseOrderItem(@RequestBody PurchaseOrderItem purchaseOrderItem) {
//        PurchaseOrderItem createdPurchaseOrderItem = purchaseOrderItemService.createPurchaseOrderItem(purchaseOrderItem);
//        return ResponseEntity.ok(createdPurchaseOrderItem);
//    }

    @PostMapping public ResponseEntity<PurchaseOrderItem> createPurchaseOrderItem(@RequestBody PurchaseOrderItem purchaseOrderItem) { try { PurchaseOrderItem createdPurchaseOrderItem = purchaseOrderItemService.createPurchaseOrderItem(purchaseOrderItem); return ResponseEntity.ok(createdPurchaseOrderItem); } catch (Exception e) {  e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); } }


    @PutMapping
    public ResponseEntity<PurchaseOrderItem> updatePurchaseOrderItem(@RequestBody PurchaseOrderItem purchaseOrderItem) {
        PurchaseOrderItem updatedPurchaseOrder = purchaseOrderItemService.updatePurchaseOrderItem(purchaseOrderItem);
        return ResponseEntity.ok(updatedPurchaseOrder);
    }

    @DeleteMapping
    public ResponseEntity<Void> deletePurchaseOrder(@RequestParam int purchase_order_item_id) {
        purchaseOrderItemService.deletePurchaseOrderItem(purchase_order_item_id);
        return ResponseEntity.noContent().build();
    }
}