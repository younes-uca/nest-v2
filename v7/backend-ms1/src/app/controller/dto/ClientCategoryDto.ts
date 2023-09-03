
export class ClientCategoryDto {
    public id: number;
    public reference: string;
    public code: string;


    constructor(id?: number, reference?: string) {
        this.id = id;
        this.reference = reference;
    }

}