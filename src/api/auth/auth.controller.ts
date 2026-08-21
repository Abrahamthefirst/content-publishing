import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "../../modules/auth/auth.service";
import { LoginReqBodyDTO, SignupReqBodyDTO } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() body: LoginReqBodyDTO) {
    const auth = await this.authService.login(body);
    return auth;
  }

  @Post()
  async signup(@Body() body: SignupReqBodyDTO) {
    const user = await this.authService.signup(body);
    return user;
  }
}
