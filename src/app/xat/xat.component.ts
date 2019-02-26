import { Component, OnInit } from '@angular/core';
import { xatService } from '../services/xat.service';

@Component({
  selector: 'app-xat',
  templateUrl: './xat.component.html',
  styleUrls: ['./xat.component.scss']
})
export class xatComponent implements OnInit {

  constructor(private xat: xatService) { }

  ngOnInit() {
  }

  messages = [];
  nickname = '';
  message = '';


   /* this.nickname = this.service.getNickname();

    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  

  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  async showToast(msg) {
    let toast =  await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


*/
}
