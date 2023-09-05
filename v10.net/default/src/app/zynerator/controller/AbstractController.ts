import { BaseDto } from "src/app/zynerator/dto/BaseDto";
import { BaseCriteria } from "src/app/zynerator/criteria/BaseCriteria";
import { AuditBusinessObject } from "src/app/zynerator/audit/AuditBusinessObject";
import { AbstractConverter } from "src/app/zynerator/converter/AbstractConverter";
import { AbstractServiceImpl } from "../service/AbstractServiceImpl";
import { AbstractRepository } from "../repository/AbstractRepository";

export class AbstractController<T extends AuditBusinessObject, DTO extends BaseDto, Criteria extends BaseCriteria, REPO extends AbstractRepository<T,Criteria>, SERV extends AbstractServiceImpl<T, Criteria, REPO>, > {
  protected service: SERV;

  protected converter: AbstractConverter<T, DTO>;

/*
  async findPaginatedByCriteria(criteria: Criteria): Promise<PaginatedList<DTO>> {
    const list = await this.service.findPaginatedByCriteria(criteria, criteria.page, criteria.maxResults, criteria.sortOrder, criteria.sortField);
    const dtos: DTO[] = this.converter.toDtos(list);
    const paginatedList = new PaginatedList(dtos, dtos.length);
    paginatedList.list = dtos;
    if (dtos && dtos.length > 0) {
      const dataSize = await this.service.getDataSize(criteria);
      paginatedList.dataSize = dataSize;
    }
    return paginatedList;
  }*/
}
