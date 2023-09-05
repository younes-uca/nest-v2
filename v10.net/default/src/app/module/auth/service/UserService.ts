import {BadRequestException, Body, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UserDao} from "../dao/UserDao";

import * as bcrypt from "bcrypt";
import {User} from "../bean/User";
import {UserRequest} from "../dto/UserRequest";
import {RoleService} from "./RoleService";

@Injectable()
export class UserService {
    constructor(private readonly repository: UserDao, private roleService: RoleService, private jwtService: JwtService) {
    }


    async save(item: User): Promise<User> {
        if (item && item.password) {
            let hashedPassword = await bcrypt.hash(item.password, 12);
            item.password = hashedPassword;
            const role = await this.roleService.findOrSave(item.role);
            item.role = role;
            const savedItem = await this.repository.save(item);
            return savedItem;
        }
        return null;
    }

    async login(userRequest: UserRequest): Promise<string> {
        const loadedUser = await this.findByUsername(userRequest.username);
        if (!loadedUser) {
            throw new BadRequestException("Bad Credentiels");
        } else {
            const hashedPasswordComparaison = await bcrypt.compare(userRequest.password, loadedUser.password);
            if (!hashedPasswordComparaison) {
                throw new BadRequestException("Bad Credentiels");
            } else {
                return this.jwtService.sign({
                    username: loadedUser.username,
                    email: loadedUser.email,
                    roles: [loadedUser.role?.authority]
                });
            }
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