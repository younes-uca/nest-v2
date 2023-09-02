import {Injectable, NotFoundException} from "@nestjs/common";

import {PurchaseItemDao} from "src/app/controller/dao/facade/core/PurchaseItemDao";
import {PurchaseItem} from "src/app/controller/bean/core/PurchaseItem";


@Injectable()
export class PurchaseItemAdminServiceImpl  {

    constructor(private readonly purchaseItemDao: PurchaseItemDao,
    ) {}

    async save(purchaseItem: PurchaseItem): Promise<PurchaseItem> {
        const savedPurchaseItem = await this.purchaseItemDao.save(purchaseItem);
        return savedPurchaseItem;
    }

    async findAll(): Promise<PurchaseItem[]> {
        return this.purchaseItemDao.findAll();
    }

    async findById(id: number): Promise<PurchaseItem> {
        return this.purchaseItemDao.findById(id);
    }

    async delete(purchaseItem: PurchaseItem): Promise<PurchaseItem> {
        const existingPurchaseItem = await this.findWithAssociatedLists(purchaseItem.id);
        if (!existingPurchaseItem) {
            // TODO : by Monsieur Zouani
            throw new NotFoundException(`Purchase item with ID ${purchaseItem.id} not found.`);
        }
        await this.purchaseItemDao.deleteById(existingPurchaseItem.id);
        return existingPurchaseItem;
    }

    async deleteMultiple(purchaseItems: PurchaseItem[]): Promise<PurchaseItem[]> {
        const deletedPurchaseItems: PurchaseItem[] = [];
        for (const purchaseItem of purchaseItems) {
            const deletedPurchaseItem = await this.delete(purchaseItem);
            deletedPurchaseItems.push(deletedPurchaseItem);
        }
        return deletedPurchaseItems;
    }

    async findByProductId(id: number): Promise<PurchaseItem[]> {
        return this.purchaseItemDao.findByProductId(id);
    }
    async findByPurchaseId(id: number): Promise<PurchaseItem[]> {
        return this.purchaseItemDao.findByPurchaseId(id);
    }

    async findWithAssociatedLists(id: number): Promise<PurchaseItem> {
        const result = await this.purchaseItemDao.findById(id);
        if (result && result.id) {
        }
        return result;
    }

}

