export class BaseDto {
    id: number;
    label: string;
    maxLevel: number = 2;

    constructor() {}

    equals(object: any): boolean {
        if (this.id !== null && object instanceof BaseDto) {
            const dto = object as BaseDto;
            return this.id === dto.id;
        }
        return false;
    }

    hashCode(): number {
        const pk: any = this.id;
        if (pk === null) {
            return 0;
        }
        return pk.toString().hashCode();
    }

    toString(): string {
        return this.id !== null ? this.id.toString() : null;
    }
}
