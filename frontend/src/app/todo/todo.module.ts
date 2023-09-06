import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoPageRoutingModule } from './todo-routing.module';

import { TodoPage } from './todo.page';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api-helper.service';
import { ToastService } from '../services/toast.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from '../services/storage.service';
import { SaveTodoModal } from './save-todo/save-todo.modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [TodoPage,SaveTodoModal],
  providers: [ToastService, ApiService,StorageService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TodoPageModule {}
