package edu.oregonstate.engr.classwork.backend.services;

import edu.oregonstate.engr.classwork.backend.models.PurchaseOrder;
import edu.oregonstate.engr.classwork.backend.models.PurchaseOrder.PurchaseOrderWithNames;
import edu.oregonstate.engr.classwork.backend.repositories.PurchaseOrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseOrderService {
    private final PurchaseOrderRepository purchaseOrderRepository;

    public PurchaseOrderService(PurchaseOrderRepository purchaseOrderRepository) {
        this.purchaseOrderRepository = purchaseOrderRepository;
    }

    public List<PurchaseOrderWithNames> getAllPurchaseOrders() {
        return purchaseOrderRepository.getAll();
    }

    public void createPurchaseOrder(PurchaseOrder purchaseOrder) {
        purchaseOrderRepository.insert(purchaseOrder);
    }

    public void updatePurchaseOrder(PurchaseOrder purchaseOrder) {
        purchaseOrderRepository.update(purchaseOrder);
    }

    public void deletePurchaseOrder(int purchase_order_id) {
        purchaseOrderRepository.delete(purchase_order_id);
    }
}