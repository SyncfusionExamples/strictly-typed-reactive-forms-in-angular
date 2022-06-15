import { Component } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  NonNullableFormBuilder,
} from '@angular/forms';
import { CustomFormValidatorService } from '../services/custom-form-validator.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  studentRegistrationForm!: FormGroup<StudentRegistration>;
  submitted = false;

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly customFormValidator: CustomFormValidatorService
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.studentRegistrationForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: [
          '',
          Validators.required,
          this.customFormValidator.userNameValidator(),
        ],
        password: [
          '',
          [
            Validators.required,
            this.customFormValidator.passwordPatternValidator(),
          ],
        ],
        confirmPassword: ['', Validators.required],
        age: [0, [Validators.required, Validators.min(14), Validators.max(25)]],
      },
      {
        validators: [
          this.customFormValidator.matchPasswordValidator(
            'password',
            'confirmPassword'
          ),
        ],
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.studentRegistrationForm.valid) {
      console.table(this.studentRegistrationForm.value);
    }
  }

  get firstNameControl() {
    return this.studentRegistrationForm.get('firstName');
  }

  get lastNameControl() {
    return this.studentRegistrationForm.get('lastName');
  }

  get emailControl() {
    return this.studentRegistrationForm.get('email');
  }

  get usernameControl() {
    return this.studentRegistrationForm.get('username');
  }

  get passwordControl() {
    return this.studentRegistrationForm.get('password');
  }

  get confirmPasswordControl() {
    return this.studentRegistrationForm.get('confirmPassword');
  }

  get ageControl() {
    return this.studentRegistrationForm.get('age');
  }
}

interface StudentRegistration {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  age: FormControl<number>;
}
