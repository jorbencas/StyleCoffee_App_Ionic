import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Errors, UserService , ReserveService } from '../core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {

  reserveForm: FormGroup;

  constructor(
    private reserveservices: ReserveService,
    private route: ActivatedRoute, 
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
    ) {
      this.reserveForm = this.fb.group({
        'dni': ['', Validators.required],
        'email': ['', Validators.required],
        'timestart': ['', Validators.required],
        'timeend':['',Validators.required],
        'datestart': ['', Validators.required],
        'dateend': ['', Validators.required],
      });
     }

     authType: String = '';
     title: String = '';
     errors: Errors = {errors: {}};
     isSubmitting = false;
   
     authenticated = false;
     reserve = [];
     currentUser: User;
     id = 0;
     
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  cangetauth() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.authenticated = authenticated;
        if(authenticated){
          this.currentUser = this.userService.getCurrentUser();
        }
      }
    );         
  }

  Submiting(){
    this.isSubmitting = true;
    this.errors = {errors: {}};
    
    let elements = this.reserveForm.value;
    let usuario = this.currentUser.usuario;
    let id = this.id;
    console.log("Dentro: " + id);
    this.reserveservices.addReserve(elements, usuario, id).subscribe(
      data => this.router.navigateByUrl('/details/' + this.id),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
