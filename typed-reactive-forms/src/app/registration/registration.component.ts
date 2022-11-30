import { Component } from '@angular/core';
import { Validators, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { StudentRegistration } from '../models/studentRegistration';
import { CustomFormValidatorService } from '../services/custom-form-validator.service';
import { UserNameValidationService } from '../services/user-name-validation.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  protected studentRegistrationForm!: FormGroup<StudentRegistration>;
  protected submitted = false;

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly customFormValidator: CustomFormValidatorService,
    private readonly userNameValidationService: UserNameValidationService
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.studentRegistrationForm = this.formBuilder.group(
      {
        firstName: this.formBuilder.control('', Validators.required),
        lastName: this.formBuilder.control('', Validators.required),
        email: this.formBuilder.control('', [
          Validators.required,
          Validators.email,
        ]),
        username: this.formBuilder.control('', {
          asyncValidators: [
            this.userNameValidationService.validate.bind(
              this.userNameValidationService
            ),
          ],
          validators: [Validators.required],
          updateOn: 'blur',
        }),
        password: this.formBuilder.control('', [
          Validators.required,
          this.customFormValidator.passwordPatternValidator(),
        ]),
        confirmPassword: this.formBuilder.control('', Validators.required),
        age: this.formBuilder.control(14, [
          Validators.required,
          Validators.min(14),
          Validators.max(25),
        ]),
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
      alert('Form submitted successfully!!!');
      console.table(this.studentRegistrationForm.value);
    }
  }

  protected resetForm(): void {
    this.submitted = false;
    this.studentRegistrationForm.reset();
  }

  protected get registrationFormControl() {
    return this.studentRegistrationForm.controls;
  }
}
