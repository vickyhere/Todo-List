import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"
import { UsersModule } from "src/users/users.module"
import { AuthService } from "./auth.service"

import { UsersService } from "src/users/users.service"
import { UserSchema } from "src/models/users.model"
import { MongooseModule } from "@nestjs/mongoose"
import { SessionSerializer } from "src/guards/session.serializer"
import { LocalStrategy } from "src/guards/local.strategy"
@Module({
  imports: [UsersModule, PassportModule.register({ session: true }),MongooseModule.forFeature([{ name: Collection.User, schema: UserSchema }])],
  providers: [AuthService, LocalStrategy, SessionSerializer,UsersService],
})
export class AuthModule {}