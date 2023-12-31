export abstract class AbstractConverter<T, DTO> {

    abstract toItem(dto: DTO): T ;

    abstract toDto(item: T): DTO ;

    toItems(dtos: DTO[]): T[] {
        if (dtos) {
            return dtos.map((dto) => this.toItem(dto));
        } else
            return null;
    }

    toDtos(items: T[]): DTO[] {
        if (items) {
            return items.map((purchase) => this.toDto(purchase));
        } else
            return null;
    }
}
