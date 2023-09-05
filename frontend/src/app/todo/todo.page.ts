import { Component, OnInit } from '@angular/core';
import { AlertController, ItemReorderEventDetail } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ITodo } from '../interface/ITodo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  todos: ITodo[] =[];

  constructor(private storage:Storage,private alertCtrl: AlertController) { }

  async ngOnInit() {
    this.storage.create();
  }

  public addTodo(todo=''): void {
    this.alertCtrl
      .create({
        header: "New todo",
        message: "What are you going to do?",
        inputs: [
          {
            name: "name",
            placeholder: "Something awesome..."
          }
        ],
        buttons: [
          {
            text: "Cancel"
          },
          {
            text: "Continue",
            handler: (data: { name: string }) => {
              if (!data.name) {
                return false;
              }
              this.todos.push({ id: 1, complete: false, name: data.name });
              return data;
            }
          }
        ]
      })
      .then(alert => {
        alert.present();
      });
  }

  markComplete(todo:ITodo){
    todo.complete=!todo.complete;
  }

  updatedTodo(todo:ITodo){
    todo.isEdit = false;
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

}
