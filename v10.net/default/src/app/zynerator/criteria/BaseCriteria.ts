export class BaseCriteria {

    etablissementId: number;
    id: number;
    notId: number;
    orderByAsc: string[];
    orderByDesc: string[];
    idsIn: number[];
    idsNotIn: number[];
    log: boolean;
    maxResults: number = 10;
    page: number = 0;
    sortField: string;
    sortOrder: string;
    peagable: boolean;
    filterName: string;
    filterWord: string;
    includes: string[];
    excludes: string[];

    constructor() {
        this.maxResults = 10;
        this.page = 0;
    }

    isPeagable(): boolean {
        if (this.maxResults != null && this.maxResults > 0) {
            this.peagable = true;
        }
        return this.peagable;
    }
}
