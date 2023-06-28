import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
    public static passwordValidator(control: AbstractControl): ValidationErrors | null {
      const value: string = control.value;
  
      if (!value.match(/\d/)) {
        return { containsNumber: true };
      }
  
      if (!value.match(/[A-Z]/)) {
        return { containsUppercase: true };
      }
  
      if (!value.match(/[a-z]/)) {
        return { containsLowercase: true };
      }
  
      if (!value.match(/[!@#$%^&*()]/)) {
        return { containsSpecialCharacter: true };
      }
  
      if (value.length < 6) {
        return { minLength: true };
      }
  
      return null;
    }
  }