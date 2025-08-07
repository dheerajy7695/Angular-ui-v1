import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.css'
})
export class FormErrorComponent {

  @Input() control: AbstractControl | null = null;
  @Input() submitted: boolean = false;

  get showErrors(): boolean {
    return !!this.control && this.control.invalid && (this.control.touched || this.control.dirty || this.submitted);
  }

  get requiredLength(): number | null {
    return this.control?.errors?.['minlength']?.['requiredLength'] ?? null;
  }

  get maxLength(): number | null {
    return this.control?.errors?.['maxlength']?.['requiredLength'] ?? null;
  }

}
