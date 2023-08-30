import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { UserDao } from "./dao/UserDao";
import { UserService } from "./service/UserService";
import { UserRest } from "./ws/UserRest";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./bean/User";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1h" } // Token expiration time
    })
  ],
  providers: [JwtStrategy, UserDao, UserService],
  controllers: [UserRest],
  exports: [JwtModule]
})
export class AuthModule {
}