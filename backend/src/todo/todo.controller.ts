import { Controller, Post, UseGuards,Request, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { TodoService } from './todo.service';
import { Todo } from 'src/models/todo.model';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    //@UseGuards(AuthenticatedGuard)
    @Post('save')
    saveTodo(@Request() req , @Body() todo:Todo): any {
     return this.todoService.saveTodo(todo);
    }

    @Get('getAllTodos')
    getAllTodos() {
     return this.todoService.getAllTodos();
    }

    @Put('update')
    updateTodo(@Request() req , @Body() todo:Todo): any {
     return this.todoService.updateTodo(todo);
    }

    @Delete('delete/:id')
    deleteTodo(@Request() req , @Param('id') id): any {
     return this.todoService.deleteTodo(id);
    }

    @Post('sortTodo')
    sortTodo(@Request() req , @Body() todo:Todo[]): any {
     return this.todoService.sortTodos(todo);
    }
}
