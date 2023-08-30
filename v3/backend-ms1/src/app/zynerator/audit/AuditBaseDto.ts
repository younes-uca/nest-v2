import { Exclude, Expose } from 'class-transformer';
import {BaseDto} from "src/app/zynerator/dto/BaseDto";

@Exclude()
export class AuditBaseDto extends BaseDto {

    @Expose({ name: 'createdOn' })
    createdOn?: string;

    @Expose({ name: 'updatedOn' })
    updatedOn?: string;

    @Expose({ name: 'createdBy' })
    createdBy?: string;

    @Expose({ name: 'updatedBy' })
    updatedBy?: string;

    constructor() {super();}

}
