package edu.oregonstate.engr.classwork.backend.services;

import edu.oregonstate.engr.classwork.backend.models.PurchaseOrderItem;
import edu.oregonstate.engr.classwork.backend.repositories.PurchaseOrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseOrderItemService {
    private final PurchaseOrderItemRepository purchaseOrderItemRepository;

    @Autowired
    public PurchaseOrderItemService(PurchaseOrderItemRepository purchaseOrderItemRepository) {
        this.purchaseOrderItemRepository = purchaseOrderItemRepository;
    }

    public List<PurchaseOrderItem> getAllPurchaseOrderItems() {
        return purchaseOrderItemRepository.getAll();
    }

    public PurchaseOrderItem createPurchaseOrderItem(PurchaseOrderItem purchaseOrderItem) {
        int purchase_order_item_id = purchaseOrderItemRepository.insert(purchaseOrderItem);
        return purchaseOrderItemRepository.getById(purchase_order_item_id);
    }

    public PurchaseOrderItem updatePurchaseOrderItem(PurchaseOrderItem purchaseOrderItem) {
        purchaseOrderItemRepository.update(purchaseOrderItem);
        return purchaseOrderItemRepository.getById(purchaseOrderItem.getPurchase_order_item_id());
    }

    public void deletePurchaseOrderItem(int purchase_order_item_id) {
        purchaseOrderItemRepository.delete(purchase_order_item_id);
    }
}