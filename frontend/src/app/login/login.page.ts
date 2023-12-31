import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api-helper.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { IUser } from '../interface/IUser';
import { Storage } from '@ionic/storage';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private apiHelperService: ApiService,
    private storageService: StorageService,
    private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.apiHelperService.post(`users/login`, { username: formData.email, password: formData.password })
        .subscribe((res) => {
          if (res.user) {
            const user = res.user as IUser;
            this.storageService.create(user);
            localStorage.setItem('sessionId',res.session);
            this.router.navigate(['todo']);
            this.toastService.showToast(res.msg, 'success');
          } else {
            this.toastService.showToast(res.message, 'danger');
          }
        });
    }
    else {
      this.toastService.showToast(`Infomration not valid!`, 'danger');
    }
  }

  async ngOnInit() {
    const user = await this.storageService.get();
    if (user) {
      //this.router.navigate(['todo']);
    }
  }

}
