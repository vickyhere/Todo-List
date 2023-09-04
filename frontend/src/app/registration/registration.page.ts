import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { ApiService } from '../services/api-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toast:ToastService,
    private apiHelperService:ApiService,
    private router:Router) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  signup() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      if (formData.password !== formData.confirmPassword) {
        this.toast.showToast('Password Not Matched!','danger');
        return;
      }
      this.apiHelperService.post(`users/signup`,formData).subscribe((response)=>{
        if(response){
          this.toast.showToast(response.msg,'success');
          this.router.navigate(['login']);
        }
      });

    } else {
      this.toast.showToast('Information is not valid!','danger');
    }
  }

  ngOnInit() {
  }


}
