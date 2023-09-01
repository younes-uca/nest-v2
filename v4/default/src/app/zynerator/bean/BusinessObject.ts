export class BusinessObject {
    id: number;
    label: string;

    constructor() {}



    equals(object: any): boolean {
        if (this.id !== null && object instanceof BusinessObject) {
            const businessObject = object as BusinessObject;
            return this.id === businessObject.id;
        }
        return false;
    }


    toString(): string {
        return this.id !== null ? this.id.toString() : null;
    }
}
