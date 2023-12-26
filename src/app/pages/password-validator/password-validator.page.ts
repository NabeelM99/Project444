import { Component } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-password-validator',
  templateUrl: './password-validator.page.html',
  styleUrls: ['./password-validator.page.scss'],
})
export class PasswordValidatorPage {
  static matchPassword(
    control: AbstractControl
  ):
    | Promise<{ [key: string]: boolean } | null>
    | Observable<{ [key: string]: boolean } | null> {
    const password = control.root.get('password')?.value;
    const confirmPassword = control.value;

    // Check if passwords match
    if (password !== confirmPassword) {
      return of({ passwordMismatch: true });
    }

    return of(null); // Passwords match
  }
}
