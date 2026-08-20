import { Injectable } from "@nestjs/common";
import { type UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getById(id: string) {
    const user = await this.userRepository.getById(id);

    return user;
  }
}
