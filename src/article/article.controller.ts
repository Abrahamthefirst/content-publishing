import { Controller, Get, Post } from "@nestjs/common";
import type { AuthService } from "../modules/auth/auth.service";

@Controller()
export class ArticleController {
  constructor(private authService: AuthService) {}

  @Post()
  login() {}

  @Post()
  signup() {}
}
