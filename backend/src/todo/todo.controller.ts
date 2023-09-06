import { Controller, Post, UseGuards, Request, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { TodoService } from './todo.service';
import { Todo } from 'src/models/todo.model';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @UseGuards(AuthenticatedGuard)
    @Post('save')
    saveTodo(@Request() req, @Body() todo: Todo): any {
        todo.userId = req.user.id;
        return this.todoService.saveTodo(todo);
    }

    @UseGuards(AuthenticatedGuard)
    @Get('getAllTodos')
    getAllTodos(@Request() req) {
        return this.todoService.getAllTodos(req.user.id);
    }

    //@UseGuards(AuthenticatedGuard)
    @Put('update')
    updateTodo(@Request() req, @Body() todo: Todo): any {
        //todo.userId = req.user.id;
        return this.todoService.updateTodo(todo);
    }

    //@UseGuards(AuthenticatedGuard)
    @Delete('delete/:id')
    deleteTodo(@Param('id') id): any {
        return this.todoService.deleteTodo(id);
    }

    @UseGuards(AuthenticatedGuard)
    @Post('sortTodo')
    sortTodo(@Body() todo: Todo[]): any {
        return this.todoService.sortTodos(todo);
    }
}
