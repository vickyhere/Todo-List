import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api-helper.service';
import { ToastService } from '../services/toast.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from '../services/storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [LoginPage],
  providers: [ToastService, ApiService,StorageService]
})
export class LoginPageModule { }
