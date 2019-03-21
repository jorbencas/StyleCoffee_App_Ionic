import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public appPages = [
    {
      title: 'Home',
      url: '/tabs',
      icon: 'home'
    },
    {
      title: 'login',
      url: '/register',
      icon: 'person'
    },
    {
      title: 'Configuración',
      url: '/list',
      icon: 'settings'
    },
    {
      title: 'Chat',
      url: '/xat',
      icon: 'chatboxes'
    },
    {
      title: 'Administración',
      url: '/xat',
      icon: 'chatboxes'
    },
    {
      title: 'Reservas',
      url: '/xat',
      icon: 'chatboxes'
    },
    {
      title: 'Favoritos',
      url: '/xat',
      icon: 'chatboxes'
    }
  ];
  
  
}
