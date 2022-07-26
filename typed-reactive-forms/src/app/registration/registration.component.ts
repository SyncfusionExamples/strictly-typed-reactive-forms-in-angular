import { Component } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  NonNullableFormBuilder,
  FormBuilder,
} from '@angular/forms';
import { CustomFormValidatorService } from '../services/custom-form-validator.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  protected studentRegistrationForm!: FormGroup<StudentRegistration>;
  protected submitted = false;

  name = new FormControl('');
  //name = new FormControl('', { nonNullable: true });

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly fb: FormBuilder,
    private readonly customFormValidator: CustomFormValidatorService
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    // this.studentRegistrationForm = this.fb.nonNullable.group(
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
        age: [0, [Validators.min(14), Validators.max(25)]],
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

  protected onSubmit(): void {
    this.submitted = true;
    if (this.studentRegistrationForm.valid) {
      console.table(this.studentRegistrationForm.value);
    }
  }

  protected resetForm() {
    this.studentRegistrationForm.reset();
  }

  protected get registrationFormControl() {
    return this.studentRegistrationForm.controls;
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
