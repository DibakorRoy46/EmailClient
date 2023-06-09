import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'EmailClient';
  signedIn$?:BehaviorSubject<boolean>;

  constructor(private authService:AuthService)
            {this.signedIn$= this.authService.signedin$}
  ngOnInit() {
    this.authService.checkAuth().subscribe(()=>{})
  }

}
