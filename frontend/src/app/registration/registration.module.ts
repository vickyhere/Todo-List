import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPageRoutingModule } from './registration-routing.module';

import { RegistrationPage } from './registration.page';
import { ToastService } from '../services/toast.service';
import { ApiService } from '../services/api-helper.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistrationPageRoutingModule,
    HttpClientModule
  ],
  declarations: [RegistrationPage],
  providers:[ToastService,ApiService]
})
export class RegistrationPageModule {}
