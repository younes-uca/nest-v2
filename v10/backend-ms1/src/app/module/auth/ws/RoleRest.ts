import {Controller, Get} from "@nestjs/common";
import {ApiOperation} from "@nestjs/swagger";
import {Role} from "../bean/Role";
import {RoleService} from "../service/RoleService";

@Controller("api/roles/")
export class RoleRest {
  constructor(private service: RoleService) {
  }



  @ApiOperation({ summary: "Finds list of all roles" })
  @Get()
  async findAll(): Promise<Role[]> {
    return this.service.findAll();
  }

}
