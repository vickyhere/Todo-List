import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) {}

  async showToast(message:string,type:string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color:type,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Toast was dismissed by user');
          }
        }
      ]
    });
    toast.present();
  }
}
