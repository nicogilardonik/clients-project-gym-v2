import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class RegisterFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        repeatEmail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, this.passwordValidator]],
        repeatPassword: ['', Validators.required],
      },
      {
        validators: [this.emailsMatchValidator, this.passwordsMatchValidator],
      },
    );
  }

  emailsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const email = group.get('email')?.value;
    const repeat = group.get('repeatEmail')?.value;
    return email === repeat ? null : { emailsDontMatch: true };
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUppercase = /[A-Z]/.test(value);
    const hasNumberOrSymbol = /[\d\W]/.test(value);

    if (hasUppercase && hasNumberOrSymbol) {
      return null;
    }

    return { passwordWeak: true };
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const repeat = group.get('repeatPassword')?.value;
    return pass === repeat ? null : { passwordsDontMatch: true };
  }

  submit() {
    if (this.form.valid) {
      console.log('✅ Registro válido:');
    } else {
      console.log('❌ Registro inválido:');
      this.form.markAllAsTouched();
    }
  }

  isInvalid(control: string): boolean {
    const c = this.form.get(control);
    return !!(c?.invalid && (c.dirty || c.touched));
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  registerWithGoogle() {
    console.log('🔐 Registrarse con Google');
  }
}
