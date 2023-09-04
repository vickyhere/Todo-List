import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    Request,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/guards/local.auth.guard';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { IUser } from 'src/interface/user.interface';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Post('/signup')
    async addUser(
        @Body() user: IUser,
    ) {
        const saltOrRound = 10;
        user.password = await bcrypt.hash(user.password, saltOrRound);
        const result = await this.usersService.insertUser(user);
        return {
            msg: 'User successfully registered',
            userId: result.id,
            userName: result.username
        };
    }
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Request() req): any {
        return {
            User: req.user,
            msg: 'User logged in'
        };
    }
    @UseGuards(AuthenticatedGuard)
    @Get('/protected')
    getHello(@Request() req): string {
        return req.user;
    }
    @Get('/logout')
    logout(@Request() req): any {
        req.session.destroy();
        return { msg: 'The user session has ended' }
    }
}