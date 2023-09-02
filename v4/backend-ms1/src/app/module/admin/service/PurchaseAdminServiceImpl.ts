import {Injectable, NotFoundException} from "@nestjs/common";

import {PurchaseDao} from "src/app/controller/dao/facade/core/PurchaseDao";
import {Purchase} from "src/app/controller/bean/core/Purchase";

import {PurchaseItemAdminServiceImpl} from "src/app/module/admin/service/PurchaseItemAdminServiceImpl";
import {PurchaseItem} from "src/app/controller/bean/core/PurchaseItem";
import {PurchaseCriteria} from "../../../controller/dao/criteria/core/PurchaseCriteria";
import {AbstractServiceImpl} from "../../../zynerator/service/AbstractServiceImpl";

@Injectable()
export class PurchaseAdminServiceImpl extends AbstractServiceImpl<Purchase, PurchaseCriteria, PurchaseDao>{

    constructor(private readonly dao: PurchaseDao,
                 private readonly purchaseItemService: PurchaseItemAdminServiceImpl ,
    ) {
        super(dao);
    }

    async save(purchase: Purchase): Promise<Purchase> {
        const savedPurchase = await this.dao.save(purchase);
        if (purchase.purchaseItems) {
            const savedPurchaseItems: PurchaseItem[] = [];
            for (const purchaseItem of purchase.purchaseItems) {
                purchaseItem.purchase = savedPurchase;
                const savedPurchaseItem = await this.purchaseItemService.save(purchaseItem);
                savedPurchaseItems.push(savedPurchaseItem);
            }
            savedPurchase.purchaseItems = savedPurchaseItems;
        }
        return savedPurchase;
    }

    async findAll(): Promise<Purchase[]> {
        return this.dao.findAll();
    }

    async findById(id: number): Promise<Purchase> {
        return this.dao.findById(id);
    }

    async delete(purchase: Purchase): Promise<Purchase> {
        const existingPurchase = await this.findWithAssociatedLists(purchase.id);
        if (!existingPurchase) {
            // TODO : by Monsieur Zouani
            throw new NotFoundException(`Purchase with ID ${purchase.id} not found.`);
        }
       /* await Promise.all(
            existingPurchase.purchaseItems.map(async item => {
                await this.purchaseItemService.deleteById(item.id);
            })
        );*/
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



}

