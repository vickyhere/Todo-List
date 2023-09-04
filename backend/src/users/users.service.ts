import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/users.model';
@Injectable()
export class UsersService {
  constructor(@InjectModel(Collection.User) private readonly userModel: Model<User>) {}
  async insertUser(userName: string, password: string) {
    const username = userName.toLowerCase();
    const user = new this.userModel({
      username,
      password,
    });
    await user.save();
    return user;
  }
  async getUser(userName: string) {
    const username = userName.toLowerCase();
    const user = await this.userModel.findOne({ username });
    return user;
  }
}