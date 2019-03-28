import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  currentUser: User;
  busqueda: '';
  visible = false;

  public appPages = [
    {
      title: 'Home',
      url: '/tabs',
      icon: 'home'
    },
    {
      title: 'login',
      url: '/login',
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
  
  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );

    /* if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'white');
    } */
  }

  Search() {
   /*  $('#searchinput').keypress((e)=>{
      if(e.which == 13) {
       this.router.navigateByUrl('/search' + this.busqueda);
      }
    })

    $('#submitbutton').click(()=>{
      this.router.navigateByUrl('/search' + this.busqueda);
    })

    if ($('#search').val() != "") {
      this.busqueda = $('#search').val();
      console.log(this.busqueda);
    } */
  }

  ngAfterViewChecked() {
   this.Search();
  }
  
}
