import { Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "../../modules/auth/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login() {}

  @Post()
  signup() {}
}
