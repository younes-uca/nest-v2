import {Injectable, NotFoundException} from "@nestjs/common";

import {AbstractServiceImpl} from "src/app/zynerator/service/AbstractServiceImpl";

import {PurchaseDao} from "src/app/controller/dao/facade/core/PurchaseDao";
import {PurchaseCriteria} from "src/app/controller/dao/criteria/core/PurchaseCriteria";
import {Purchase} from "src/app/controller/bean/core/Purchase";
import {PurchaseDto} from "src/app/controller/dto/PurchaseDto";

import {PurchaseItemAdminServiceImpl} from "src/app/module/admin/service/PurchaseItemAdminServiceImpl";
import {PurchaseItem} from "src/app/controller/bean/core/PurchaseItem";

@Injectable()
export class PurchaseAdminServiceImpl extends AbstractServiceImpl<Purchase, PurchaseCriteria, PurchaseDao>{

    constructor(private readonly dao: PurchaseDao ,
                 private readonly purchaseItemService: PurchaseItemAdminServiceImpl ,
    ) {
        super(dao);
    }

    async save(item: Purchase): Promise<Purchase> {
        const saved = await this.dao.save(item);
        if (item.purchaseItems) {
            const savedPurchaseItems: PurchaseItem[] = [];
            for (const purchaseItem of item.purchaseItems) {
                purchaseItem.purchase = saved;
                const savedPurchaseItem = await this.purchaseItemService.save(purchaseItem);
                savedPurchaseItems.push(savedPurchaseItem);
            }
            saved.purchaseItems = savedPurchaseItems;
        }
        return saved;
    }


    async update(item: Purchase): Promise<Purchase> {
        const saved = await this.dao.saveOrUpdate(item);
        return saved;
    }

    async updateMultiple(items: Purchase[]): Promise<void> {
        if (items) {
            items.forEach(e => this.update(e))
        }
    }

    async  findAllOptimized(): Promise<PurchaseDto[]> {
        return this.dao.findAllOptimized();
    }

    async findAll(): Promise<Purchase[]> {
        return this.dao.findAll();
    }

    async findById(id: number): Promise<Purchase> {
        return this.dao.findById(id);
    }

    async deleteById(id: number): Promise<void> {
        return this.dao.deleteById(id);
    }

    async delete(purchase: Purchase): Promise<Purchase> {
        const existingPurchase = await this.findWithAssociatedLists(purchase.id);
        if (!existingPurchase) {
            // TODO : by Monsieur Zouani
            throw new NotFoundException(`Purchase with ID ${purchase.id} not found.`);
        }
        this.purchaseItemService.dele
        await this.dao.deleteById(existingPurchase.id);
        return existingPurchase;
    }

    async deleteMultiple(purchases: Purchase[]): Promise<Purchase[]> {
        const deletedPurchases: Purchase[] = [];
        for (const purchase of purchases) {
            const deletedPurchase = await this.delete(purchase);
            deletedPurchases.push(deletedPurchase);
        }
        return deletedPurchases;
    }

    async findByClientId(id: number): Promise<Purchase[]> {
        return this.dao.findByClientId(id);
    }

    async findWithAssociatedLists(id: number): Promise<Purchase> {
        const result = await this.dao.findById(id);
        if (result && result.id) {
          result.purchaseItems = await this.purchaseItemService.findByPurchaseId(result.id);
        }
    return result;
    }



    async updateWithAssociatedLists(item: Purchase): Promise<Purchase> {
            if (item && item.id) {
                //update  purchaseItems
                const oldPurchaseItems = await this.purchaseItemService.findByPurchaseId(item.id);
                const result = this.purchaseItemService.getToBeSavedAndToBeDeleted(oldPurchaseItems, item.purchaseItems);
                await this.purchaseItemService.deleteMultiple(result[1]);
                (result[0] || []).forEach((e) => e.purchase = item);
                await this.purchaseItemService.updateMultiple(result[0]);

                return this.update(item);
        }

    }


}

