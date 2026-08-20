import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "../../api/auth/auth.controller";
import { UserRepository } from "../repositories/user.repository";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { RepositoryModule } from "../repositories/repository.module";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,

      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_ACCESS_SECRET"),
        signOptions: { expiresIn: "60m" },
      }),
    }),
    RepositoryModule
  ],
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
