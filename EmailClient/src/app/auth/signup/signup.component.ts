import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, ValidatorFn, AsyncValidatorFn } from '@angular/forms'
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../services/auth.service';
import { NotFoundError, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authForm=new FormGroup({
    username:new FormControl('',[
                                Validators.required,
                                Validators.maxLength(15),
                                Validators.minLength(6),
                                Validators.pattern(/^[a-zA-z0-9]+$/)
                              ],[this.uniqueUsername.validate as AsyncValidatorFn]),
    password:new FormControl('',[
                                Validators.required,
                                Validators.minLength(8),
                                Validators.maxLength(15)
                              ]),
    passwordConfirmation:new FormControl('',[
                                Validators.required,
                                Validators.maxLength(15),
                                Validators.minLength(8)
                              ])
                            },
                            { validators: [this.matchPassword.validate.bind(this.matchPassword) as ValidatorFn ]}
  );


  constructor(private matchPassword:MatchPassword,
              private uniqueUsername:UniqueUsername,
              private authService:AuthService,
              private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.authForm.invalid){
      return;
    }
    this.authService.signup(this.authForm.value).subscribe(response=>{
      this.router.navigateByUrl('/inbox');
    })
  }

}
