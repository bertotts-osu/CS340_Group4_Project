package edu.oregonstate.engr.classwork.backend.controllers;

import edu.oregonstate.engr.classwork.backend.models.PurchaseOrder;
import edu.oregonstate.engr.classwork.backend.models.PurchaseOrder.PurchaseOrderWithNames;
import edu.oregonstate.engr.classwork.backend.services.PurchaseOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController//combines Controller + ResponseBody annotations
@RequestMapping("/purchase-orders")
@CrossOrigin(origins = {"http://classwork.engr.oregonstate.edu:14571", "http://localhost:14571"})
public class PurchaseOrderController {
    private final PurchaseOrderService purchaseOrderService;

    public PurchaseOrderController(PurchaseOrderService purchaseOrderService) {
        this.purchaseOrderService = purchaseOrderService;
    }

    @GetMapping
    public ResponseEntity<List<PurchaseOrderWithNames>> getAllPurchaseOrders() {
        List<PurchaseOrderWithNames> purchaseOrders = purchaseOrderService.getAllPurchaseOrders();
        return ResponseEntity.ok(purchaseOrders);
    }

    @PostMapping
    public ResponseEntity<Void> createPurchaseOrder(@Validated @RequestBody PurchaseOrder purchaseOrder) {
        purchaseOrderService.createPurchaseOrder(purchaseOrder);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Void> updatePurchaseOrder(@Validated @RequestBody PurchaseOrder purchaseOrder) {
        purchaseOrderService.updatePurchaseOrder(purchaseOrder);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deletePurchaseOrder(@RequestParam int purchase_order_id) {
        purchaseOrderService.deletePurchaseOrder(purchase_order_id);
        return ResponseEntity.noContent().build();
    }
}