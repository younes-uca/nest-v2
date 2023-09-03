

export class PaginatedList<T> {

     public list : Array<T>;
     public dataSize = 0;

    constructor(list: Array<T>, dataSize: number) {
        this.list = list;
        this.dataSize = dataSize;
    }
}
