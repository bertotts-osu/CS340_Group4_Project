package edu.oregonstate.engr.classwork.backend.services;

import edu.oregonstate.engr.classwork.backend.models.PurchaseOrder;
import edu.oregonstate.engr.classwork.backend.repositories.PurchaseOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseOrderService {
    private final PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    public PurchaseOrderService(PurchaseOrderRepository purchaseOrderRepository) {
        this.purchaseOrderRepository = purchaseOrderRepository;
    }

    public List<PurchaseOrder> getAllPurchaseOrders() {
        return purchaseOrderRepository.getAll();
    }

    public PurchaseOrder createPurchaseOrder(PurchaseOrder purchaseOrder) {
        int purchase_order_id = purchaseOrderRepository.insert(purchaseOrder);
        return purchaseOrderRepository.getById(purchase_order_id);
    }

    public PurchaseOrder updatePurchaseOrder(PurchaseOrder purchaseOrder) {
        purchaseOrderRepository.update(purchaseOrder);
        return purchaseOrderRepository.getById(purchaseOrder.getPurchase_order_id());
    }

    public void deletePurchaseOrder(int purchase_order_id) {
        purchaseOrderRepository.delete(purchase_order_id);
    }
}