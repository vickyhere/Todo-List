import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/users.model';
import { IUser } from 'src/interface/user.interface';
@Injectable()
export class UsersService {
  constructor(@InjectModel(Collection.User) private readonly userModel: Model<User>) {}
  async insertUser(newUser:IUser) {
    newUser.username = newUser.username.toLowerCase();
    const user = new this.userModel(newUser);
    await user.save();
    return user;
  }
  async getUser(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}