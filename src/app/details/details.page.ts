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
  isbn = "";
  constructor(private route: ActivatedRoute, private router: Router, private BookService: BookService){
   
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isbn = params['isbn'];
      this.BookService.getBook(this.isbn).subscribe(book =>{
        this.infos.push(book);
      });
    });
  }

  
}
