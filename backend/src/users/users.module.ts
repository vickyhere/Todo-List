import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { UsersController } from "./users.controller"
import { UserSchema } from "../models/users.model"
import { UsersService } from "./users.service"
@Module({
  imports: [MongooseModule.forFeature([{ name: Collection.User, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}