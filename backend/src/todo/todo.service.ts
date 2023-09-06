import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from 'src/models/todo.model';

@Injectable()
export class TodoService {
    constructor(@InjectModel(Collection.Todo) private readonly todoModel: Model<Todo>) {}

    getAllTodos(userId:string){
        return this.todoModel.find({userId}, null, { sort: { order: 1 } });
    }

    saveTodo(todo:Todo){
        return new this.todoModel(todo).save();
    }

    updateTodo(todo:Todo){
        return new this.todoModel(todo).updateOne(todo);
    }

    deleteTodo(id:string){
        return this.todoModel.deleteOne({_id:id});
    }

    async sortTodos(todos:Todo[]){
        for (const data of todos) {
            const filter = { _id: data._id };
            const update = { order: data.order };
            await this.todoModel.updateMany(filter, update);
        }
    }

}
