import { Component, OnInit } from '@angular/core';
import { AlertController, ItemReorderEventDetail, ModalController, ModalOptions } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ITodo } from '../interface/ITodo';
import { ApiService } from '../services/api-helper.service';
import { SaveTodoModal } from './save-todo/save-todo.modal';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  todos: ITodo[] =[];

  constructor(
    private storage:Storage,
    private modalCtrl: ModalController,
    private apiHelperService:ApiService,
    private toastService:ToastService,
    private router:Router) { }

  async ngOnInit() {
    this.storage.create();
    this.getAllTodos();
  }

  markComplete(todo:ITodo){
    todo.complete=!todo.complete;
    this.updateTodo(todo);
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.todos = ev.detail.complete(this.todos);
    this.todos = this.todos.map((todo:ITodo,index:number)=>{
      todo.order = index;
      return todo;
    });
    this.sortTodos()
  }

  getAllTodos(){
    this.apiHelperService.get('todo/getAllTodos').subscribe((res)=>{
      this.todos = res as ITodo[];
    },(error)=>{
      if(error.status===403){
        this.logout();
      }
    });
  }

  saveTodo(todo:ITodo){
    todo.order = this.getSortOrder();
    this.apiHelperService.post('todo/save', todo).subscribe((res)=>{
      this.toastService.showToast(`Todo Added Successfully`,'success');
      this.getAllTodos();
    });
  }

  updateTodo(todo:ITodo){
    this.apiHelperService.put('todo/update', todo).subscribe((res)=>{
      this.getAllTodos();
      this.toastService.showToast(`Todo Updated Successfully`,'success');
    });
  }

  deleteTodo(id:string){
    this.apiHelperService.delete(`todo/delete/${id}`).subscribe((res)=>{
      this.getAllTodos();
      this.toastService.showToast(`Todo Deleted Successfully`,'success');
    });
  }

  sortTodos(){
    this.apiHelperService.post('todo/sortTodo', this.todos).subscribe((res)=>{
      this.getAllTodos();
    });
  }

  async openModal(todo?:ITodo) {
    const modalProp = {
      component: SaveTodoModal,
    } as ModalOptions;

    if(todo){
      modalProp.componentProps = todo;
    }

    const modal = await this.modalCtrl.create(modalProp);
    modal.present();

    const item = await modal.onWillDismiss();
    if (item.data) {
      if (todo) {
        //update existing todo
        this.updateTodo(item.data);
      }
      else {
        //create new todo
        this.saveTodo(item.data);
      }
    }
  }

  getSortOrder(){
    return this.todos.length+1;
  }

  logout(){
    this.storage.clear();
    localStorage.clear();
    this.apiHelperService.get('users/logout').subscribe((res)=>{
      if(res){
        this.toastService.showToast(res.msg,'danger');
        this.router.navigate(['login'],{replaceUrl:true});
      }
    });
  }

}
