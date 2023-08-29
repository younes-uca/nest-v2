import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserDao } from "../dao/UserDao";

import * as bcrypt from "bcrypt";
import { User } from "../bean/User";
import { UserRequest } from "../dto/UserRequest";

@Injectable()
export class UserService {
  constructor(private readonly repository: UserDao, private jwtService: JwtService) {
  }


  async save(item: User): Promise<User> {
    let hashedPassword = await bcrypt.hash(item.password, 12);
    item.password = hashedPassword;
    const savedItem = await this.repository.save(item);
    return savedItem;
  }

  async login(userRequest: UserRequest): Promise<string> {
    const loadedUser = await this.findByUsername(userRequest.username);
    if (!loadedUser) {
      throw new BadRequestException("Bad Credentiels");
    } else if (!await bcrypt.compare(loadedUser.password, userRequest.password)) {
      throw new BadRequestException("Bad Credentiels");
    } else {
      return this.jwtService.sign({ username: loadedUser.username, email: loadedUser.email });
    }
  }

  async findAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  async findById(id: number): Promise<User> {
    return this.repository.findById(id);
  }


  deleteById(id: number): Promise<void> {
    return this.repository.deleteById(id);
  }

  async findByUsername(username: string): Promise<User> {
    return this.repository.findByUsername(username);
  }


}