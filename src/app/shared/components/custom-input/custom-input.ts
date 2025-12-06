import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-input.html',
  styleUrls: ['./custom-input.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() type: string = '';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() options: { label: string; value: string }[] = [];
  @Input() errors: any = {};
  @Input() control!: any;

  value: any = '';
  disabled = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  handleInput(event: any) {
    this.value = event.target.value;
    this.onChange(this.value);
  }

  get showError() {
    return this.control && this.control.touched && this.control.invalid;
  }

  get errorMessage() {
    if (!this.control || !this.control.errors) return '';
    const firstKey = Object.keys(this.control.errors)[0];
    return this.errors[firstKey];
  }
}
