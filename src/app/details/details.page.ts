import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { BookService } from '../core';

@Component({
  selector: 'app-details',
  templateUrl: 'details.page.html',
  styleUrls: ['details.page.scss']
})

export class DetailsPage implements OnInit  {

  infos = [];
  constructor(private route: ActivatedRoute, private router: Router, private BookService: BookService){
   
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.BookService.getBook(id).subscribe(book =>{
        this.infos = book;
      });
    });
  }

  
}
