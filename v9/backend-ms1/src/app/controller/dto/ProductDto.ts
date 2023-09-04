
export class ProductDto {
    public id: number;
    public code: string;
    public reference: string;


    constructor(id?: number, reference?: string) {
        this.id = id;
        this.reference = reference;
    }

}