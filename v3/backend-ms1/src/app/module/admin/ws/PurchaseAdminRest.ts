import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PurchaseAdminServiceImpl } from "src/app/module/admin/service/PurchaseAdminServiceImpl";
import { PurchaseDto } from "src/app/controller/dto/PurchaseDto";
import { PurchaseConverter } from "../../../controller/converter/PurchaseConverter";


@ApiTags("Manages purchase services")
@Controller("api/admin/purchase")
export class PurchaseAdminRest { //extends AbstractController<Purchase, PurchaseDto, PurchaseCriteria, PurchaseDao, PurchaseAdminServiceImpl> {

  constructor(private readonly service: PurchaseAdminServiceImpl,
              private readonly converter: PurchaseConverter) {
  }

  @ApiOperation({ summary: "Finds a list of all purchases" })
  @Get()
  async findAll(): Promise<PurchaseDto[]> {
    const purchases = await this.service.findAll();
    return this.converter.toDtos(purchases);
  }

  @ApiOperation({ summary: "Finds a purchase by id" })
  @Get("id/:id")
  async findById(@Param("id") id: number): Promise<PurchaseDto> {
    const purchase = await this.service.findById(id);
    return this.converter.toDto(purchase);
  }

  @ApiOperation({ summary: "Saves the specified purchase" })
  @Post()
  async save(@Body() dto: PurchaseDto): Promise<PurchaseDto> {
    this.converter.purchaseItemConverter.purchase = false;
    const purchase = this.converter.toItem(dto);
    const savedPurchase = await this.service.save(purchase);
    const purchaseDto = this.converter.toDto(savedPurchase);
    this.converter.purchaseItemConverter.purchase = true;
    return purchaseDto;
  }


  /*@ApiOperation({summary: 'Updates the specified purchase'})
  @Put()
  async update(@Body() dto: PurchaseDto): Promise<PurchaseDto> {
      const purchase = this.converter.toItem(dto);
      const updatedPurchase = await this.service.update(purchase);
      return this.converter.toDto(updatedPurchase);
  }
  */

  @ApiOperation({ summary: "Finds an optimized list of all purchases" })
  @Get("optimized")
  async findAllOptimized(): Promise<PurchaseDto[]> {
    const purchases = await this.service.findAll();
    return this.converter.toDtos(purchases);
  }

  @ApiOperation({ summary: "Finds an optimized list of all purchases" })
  @Get("find-by-criteria")
  async findByCriteria(): Promise<PurchaseDto[]> {
    const purchases = await this.service.findAll();
    return this.converter.toDtos(purchases);
  }


  /*  @ApiOperation({ summary: "Finds paginated purchases by criteria" })
    @Post("find-paginated-by-criteria")
    async findPaginatedByCriteria(@Body() criteria: PurchaseCriteria): Promise<PaginatedList<PurchaseDto>> {
      return super.findPaginatedByCriteria(criteria);
    }*/

  @Get("detail/id/:id")
  async findWithAssociatedLists(@Param("id") id: number): Promise<PurchaseDto> {
    const purchase = await this.service.findWithAssociatedLists(id);
    return this.converter.toDto(purchase);
  }

  @Get("client/id/:id")
  async findByClientId(@Param("id") id: number): Promise<PurchaseDto[]> {
    const purchases = await this.service.findByClientId(id);
    return this.converter.toDtos(purchases);
  }

  @Delete()
  async delete(@Body() dto: PurchaseDto): Promise<PurchaseDto> {
    const purchase = this.converter.toItem(dto);
    const deletedPurchase = await this.service.delete(purchase);
    return this.converter.toDto(deletedPurchase);
  }

  @Post("multiple")
  async deleteMultiple(@Body() dtos: PurchaseDto[]): Promise<PurchaseDto[]> {
    const purchases = dtos.map(dto => this.converter.toItem(dto));
    const deletedPurchases = await this.service.deleteMultiple(purchases);
    return deletedPurchases.map(purchase => this.converter.toDto(purchase));
  }

}