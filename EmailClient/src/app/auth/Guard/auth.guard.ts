import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, skipWhile, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService:AuthService,
              private router:Router){}

  canLoad(route: Route, segments: UrlSegment[]):
  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.signedin$.pipe(
      skipWhile(value=>value===null),
      take(1),
      tap(authenticated=>{
        if(!authenticated){
          this.router.navigateByUrl('/');
        }
      })
    )
  }
}
