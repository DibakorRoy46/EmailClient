import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(6),
      Validators.pattern(/^[a-zA-z0-9]+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15)
    ]),
  })

  constructor(private authService:AuthService,
              private router:Router) { }
  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.signin(this.signinForm.value).subscribe(()=>{
        this.router.navigateByUrl('/inbox');
    })
  }
}
