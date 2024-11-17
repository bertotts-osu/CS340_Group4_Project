package edu.oregonstate.engr.classwork.backend.services;

import edu.oregonstate.engr.classwork.backend.models.PurchaseOrderItem;
import edu.oregonstate.engr.classwork.backend.models.PurchaseOrderItem.PurchaseOrderItemWithNames;
import edu.oregonstate.engr.classwork.backend.repositories.PurchaseOrderItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseOrderItemService {
    private final PurchaseOrderItemRepository purchaseOrderItemRepository;

    public PurchaseOrderItemService(PurchaseOrderItemRepository purchaseOrderItemRepository) {
        this.purchaseOrderItemRepository = purchaseOrderItemRepository;
    }

    public List<PurchaseOrderItemWithNames> getAllPurchaseOrderItems() {
        return purchaseOrderItemRepository.getAll();
    }

    public void createPurchaseOrderItem(PurchaseOrderItem purchaseOrderItem) {
        purchaseOrderItemRepository.insert(purchaseOrderItem);
    }

    public void updatePurchaseOrderItem(PurchaseOrderItem purchaseOrderItem) {
        purchaseOrderItemRepository.update(purchaseOrderItem);
    }

    public void deletePurchaseOrderItem(int purchase_order_item_id) {
        purchaseOrderItemRepository.delete(purchase_order_item_id);
    }
}