import { FormControl } from '@angular/forms';

export interface StudentRegistration {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  age: FormControl<number>;
}
