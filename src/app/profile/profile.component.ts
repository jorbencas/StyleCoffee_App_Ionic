import { Component, OnInit } from '@angular/core';
import { User, Profile, UserService } from '../core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  profileForm: FormGroup;
avaible = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    // create form group using the form builder
    this.profileForm = this.fb.group({
      'avatar': '',
      'usuario': '',
      'tipo': '',
      'email': '',
      'password': '',
      'pais': '',
      'provincia': '',
      'poblacion': ''
    });
  }

  permitirGuardado: false;
  profile: Profile;
  currentUser: User;
  isUser: boolean;
  errors: Object = {};
  isSubmitting = false;
  avatar = '';
  poblacion : [];
  pais: [];
  provincia: [];
  
  ngOnInit() {
    this.route.data.pipe(
      concatMap((data: { profile: Profile }) => {
        //this.profile = data.profile;
        // Load the current user's data.
        return this.userService.currentUser.pipe(tap(
          (userData: User) => {
            this.currentUser = userData;
            console.log(this.currentUser);
            if (this.currentUser.pais == "") {
              this.userService.loadpais().subscribe(pais => {
                this.pais = pais
                this.currentUser.pais = pais;
              });
            } else if (this.currentUser.poblacion == "") {
              this.userService.loadPoblacion().subscribe(poblacion => {
                this.poblacion = poblacion;
                this.currentUser.poblacion = poblacion;
              });
            } else if (this.currentUser.provincia == "") {
              this.userService.loadProvincia().subscribe(provincia => {
                this.provincia = provincia;
                this.currentUser.provincia = provincia;
              });
            }
          }
        ));
      })
    ).subscribe();
  }
  
  changeavatar(){
    this.userService.update_img(this.avatar);
  }

  changeeditable(){
    this.avaible = true;
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateUser(this.profileForm.value);

    this.userService
      .update(this.user)
      .subscribe(
        updatedUser => this.router.navigateByUrl('/profile'),
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
  }

  updateUser(values: Object) {
    Object.assign(this.user, values);
  }

}





