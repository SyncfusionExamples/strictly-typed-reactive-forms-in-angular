import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserNameValidationService implements AsyncValidator {
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.validateUserName(control.value).pipe(
      map((duplicateUserName) => {
        if (duplicateUserName) {
          return { userNameNotAvailable: true };
        } else {
          return null;
        }
      }),
      catchError(() => of(null))
    );
  }

  /* A static array is used to validate the availability of user names.
   * Ideally it should be a service call to the server to search the value from a database.
   */
  private validateUserName(username: string): Observable<boolean> {
    const UserList = ['admin', 'user', 'superuser'];
    return of(UserList.includes(username.toLocaleLowerCase()));
  }
}
