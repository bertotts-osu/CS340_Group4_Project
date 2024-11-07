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
}