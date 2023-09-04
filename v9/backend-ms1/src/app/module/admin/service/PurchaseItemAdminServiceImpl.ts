import {Injectable, NotFoundException} from "@nestjs/common";

import {AbstractServiceImpl} from "src/app/zynerator/service/AbstractServiceImpl";

import {PurchaseItemDao} from "src/app/controller/dao/facade/core/PurchaseItemDao";
import {PurchaseItemCriteria} from "src/app/controller/dao/criteria/core/PurchaseItemCriteria";
import {PurchaseItem} from "src/app/controller/bean/core/PurchaseItem";
import {PurchaseItemDto} from "src/app/controller/dto/PurchaseItemDto";


@Injectable()
export class PurchaseItemAdminServiceImpl extends AbstractServiceImpl<PurchaseItem, PurchaseItemCriteria, PurchaseItemDao>{

    constructor(private readonly dao: PurchaseItemDao ,
    ) {
        super(dao);
    }

    async save(item: PurchaseItem): Promise<PurchaseItem> {
        const saved = await this.dao.save(item);
        return saved;
    }


    async update(item: PurchaseItem): Promise<PurchaseItem> {
        const saved = await this.dao.saveOrUpdate(item);
        return saved;
    }

    async updateMultiple(items: PurchaseItem[]): Promise<void> {
        if (items) {
            items.forEach(e => this.update(e))
        }
    }

    async  findAllOptimized(): Promise<PurchaseItemDto[]> {
        return this.dao.findAllOptimized();
    }

    async findAll(): Promise<PurchaseItem[]> {
        return this.dao.findAll();
    }

    async findById(id: number): Promise<PurchaseItem> {
        return this.dao.findById(id);
    }

    async deleteById(id: number): Promise<void> {
        return this.dao.deleteById(id);
    }

    async delete(purchaseItem: PurchaseItem): Promise<PurchaseItem> {
        const existingPurchaseItem = await this.findWithAssociatedLists(purchaseItem.id);
        if (!existingPurchaseItem) {
            // TODO : by Monsieur Zouani
            throw new NotFoundException(`Purchase item with ID ${purchaseItem.id} not found.`);
        }
        await this.dao.deleteById(existingPurchaseItem.id);
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
        return this.dao.findByProductId(id);
    }
    async findByPurchaseId(id: number): Promise<PurchaseItem[]> {
        return this.dao.findByPurchaseId(id);
    }

    async findWithAssociatedLists(id: number): Promise<PurchaseItem> {
        const result = await this.dao.findById(id);
    return result;
    }



    async updateWithAssociatedLists(item: PurchaseItem): Promise<PurchaseItem> {
         return await this.dao.saveOrUpdate(item);
    }


}

