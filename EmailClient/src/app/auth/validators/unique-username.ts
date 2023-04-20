import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AsyncValidator, FormControl, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthService } from "../services/auth.service";


@Injectable({
  providedIn:'root'
})
export class UniqueUsername implements AsyncValidator {
  constructor(private http: HttpClient,
              private authService:AuthService) {}

  validate = (control: FormControl): Observable<ValidationErrors | null> => {
    const { value } = control;
    return this.authService.usernameAvailable(value).pipe(
      map((response) => {
        if (response.available) {
          return null; // valid username
        } else {
          return { nonUniqueUsername: true }; // invalid username
        }
      }),
      catchError(() => of({ noConnection: true })) // server error
    );
  };
}
