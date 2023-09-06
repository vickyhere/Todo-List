import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ITodo } from 'src/app/interface/ITodo';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'save-modal',
  templateUrl: './save-todo.modal.html'
})
export class SaveTodoModal implements OnInit {

  todo = <ITodo>{ complete: false};

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private toastService:ToastService) {}

  ngOnInit() {
    const todo = this.navParams.data as ITodo;
    if(todo._id){
      this.todo = todo;
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  saveTask() {

    if(!this.todo._id && !this.todo.name){
      this.toastService.showToast(`Name should not be empty`,'danger');
      return;
    }

    this.modalController.dismiss(this.todo);
  }
}
