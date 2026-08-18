import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PrismaModule } from "./prisma.module";

import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule],
  controllers: [AppController],
})
export class AppModule {}
