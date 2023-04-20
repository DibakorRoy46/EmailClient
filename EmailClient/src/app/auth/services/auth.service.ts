import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { tap } from 'rxjs/operators';
interface AvailableUsernameResponse{
  available:boolean;
}
interface SignupCredential{
  username?:string|null,
  password?:string|null,
  passwordConfirmation?:string|null
}
interface SignupResponse{
  username:string;
}
interface SigninResponse{
  authenticated:boolean,
  username:string
}
interface SigninCredentails{
  username?:string | null,
  password?:string | null
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl='https://api.angular-email.com/auth';
  signedin$=new BehaviorSubject(false);
  constructor(private http:HttpClient) { }
  usernameAvailable(username:string){
    return this.http.post<AvailableUsernameResponse>(`${this.rootUrl}/username`, {
      username
    })
  }
  signin(credentail:SigninCredentails){
    return this.http.post(`${this.rootUrl}/signin`,credentail).pipe(
      tap(()=>{
        this.signedin$.next(true);
      })
    )
  }
  signup(credentail:SignupCredential){
    return this.http.post<SignupResponse>(`${this.rootUrl}/signup`,credentail,{
      withCredentials:true
    }).pipe(
      tap(()=>{
        this.signedin$.next(true);
      })
    );
  }
  checkAuth(){
    return this.http.get<SigninResponse>(`${this.rootUrl}/signedin`).pipe(
        tap(({authenticated})=>{
            this.signedin$.next(authenticated);
        })
      )
  }
  signout(){
    return this.http.post(`${this.rootUrl}/signout`,{}).pipe(
      tap(()=>{
        this.signedin$.next(false);
      })
    )
  }
}
