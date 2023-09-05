import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(email);
    if (!user) {
        throw new NotAcceptableException('could not find the user');
    }
    const passwordValid = await bcrypt.compare(password, user.password)
    if (user && passwordValid) {
      return user;
    }
    return null;
  }
}