import { Injectable, NotFoundException } from "@nestjs/common";
import type { UserRepository } from "../repositories/user.repository";
import { comparePassword, hashPassword } from "../../utils/password";
import type { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(input: { email: string; password: string }) {
    const { email, password } = input;

    const user = await this.userRepo.getByEmail(email);

    if (!user) {
      throw new NotFoundException("Invalid Credentials");
    }

    const pwdCheck = await comparePassword(password, user.password);

    if (!pwdCheck) {
      throw new NotFoundException("Invalid Credentials");
    }

    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
    });

    const refreshToken = this.jwtService.sign(
      { id: user.id, email: user.email },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: "7d" },
    );

    return { ...user, access_token: accessToken, refresh_token: refreshToken };
  }

  async signup(input: { email: string; password: string; username: string }) {
    const { email, password, username } = input;

    const hashedPassword = await hashPassword(password);
    const user = await this.userRepo.create({
      email,
      password: hashedPassword,
      username,
    });
    return user;
  }
}
