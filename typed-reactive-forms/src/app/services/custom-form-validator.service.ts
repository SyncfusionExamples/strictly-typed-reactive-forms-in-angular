import { Injectable } from '@angular/core';
import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomFormValidatorService {
  passwordPatternValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const validPattern = regex.test(control.value);
      return validPattern ? null : { invalidPassword: true };
    };
  }

  matchPasswordValidator(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);
      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  userNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.validateUserName(control.value).pipe(
        map((duplicateUserAvailable) => {
          if (duplicateUserAvailable) {
            return { userNameNotAvailable: true };
          } else {
            return null;
          }
        })
      );
    };
  }

  /* A static array is used to validate the availability of user names.
   *  Ideally it should be a service call to the server to search the value from a database.
   */
  private validateUserName(username: string): Observable<boolean> {
    const userNameList = ['ankit', 'admin', 'superadmin'];
    return of(userNameList.includes(username)).pipe(delay(1000));
  }
}
