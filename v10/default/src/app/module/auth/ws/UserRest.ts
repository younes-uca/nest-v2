import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import { UserService } from "../service/UserService";
import { User } from "../bean/User";
import { ApiOperation } from "@nestjs/swagger";
import { UserRequest } from "../dto/UserRequest";

@Controller("")
export class UserRest {
  constructor(private service: UserService) {
  }


  @Post("/login")
  async login(@Body() userRequest: UserRequest): Promise<string> {
    return this.service.login(userRequest);
  }

  @ApiOperation({ summary: "Saves the specified user" })
  @Post("/user")
  async save(@Body() item: User): Promise<User> {
    console.log(item)
    const savedItem = await this.service.save(item);
    return savedItem;
  }

  @ApiOperation({ summary: "Finds list of all users" })
  @Get()
  async findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @ApiOperation({ summary: "Finds user by id" })
  @Get("/detail/id/:id")
  async findById(@Param('id') id: number): Promise<User> {
    return this.service.findById(id);
  }

  @ApiOperation({ summary: "Delete  user by id" })
  @Delete("/id/:id")
  deleteById(@Param('id') id: number): Promise<void> {
    return this.service.deleteById(id);
  }

}
