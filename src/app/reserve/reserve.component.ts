import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, Errors, UserService , ReserveService } from '../core';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;


  constructor(
    private reserveservices: ReserveService,
    private route: ActivatedRoute, 
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
    ) {
      this.authForm = this.fb.group({
        'dni': ['', Validators.required],
        'email': ['', Validators.required],
        'timestart': ['', Validators.required],
        'timeend':['',Validators.required],
        'datestart': ['', Validators.required],
        'dateend': ['', Validators.required],
      });
     }

    authenticated = false;
    reserve = [];
    currentUser: User;
    id = 0;

  ngOnInit() {
    this.route.params.subscribe(params => {
      let action = params['actions'];
      this.id = params['id'];
      if(action){
        switch (action){
          case "add":
           /*  this.reserveservices.addReserve(id).subscribe(reserve => {
              this.reserve.push(reserve);
            }); */
            break;
          case "reserve":
            /* this.reserveservices.removeReserve(id).subscribe(reserve => {
              this.reserve.push(reserve);
            }); */
            break;
        }
      }else{
        this.reserveservices.getOneReserve(this.id).subscribe(reserve => {
          this.reserve.push(reserve);
        });
      }//end else 
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

  onSubmit(){
    this.isSubmitting = true;
    this.errors = {errors: {}};
    
    let elements = this.authForm.value;
    let usuario = this.currentUser.usuario;
    let id = this.id;
    this.reserveservices.addReserve(elements, usuario, id).subscribe(
      data => this.router.navigateByUrl('/details/' + this.id),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
