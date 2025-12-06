import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from '../custom-input/custom-input';
import { FORM_CONFIG } from '../../config/form-config';
import { MatButtonModule } from '@angular/material/button';
import { FormConfig } from '../../models/FormConfig.model';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomInputComponent, MatButtonModule],
  templateUrl: './dynamic-form.html',
  styleUrls: ['./dynamic-form.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() config: FormConfig = FORM_CONFIG;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const controls: any = {};
    this.config.forEach((field) => {
      const validationFns: any[] = [];
      field.validators?.forEach((v) => {
        if (v === 'required') validationFns.push(Validators.required);
        if (v.startsWith('minLength')) {
          const len = Number(v.split(':')[1]);
          validationFns.push(Validators.minLength(len));
        }
      });
      controls[field.formControlName] = ['', validationFns];
    });

    this.form = this.fb.group(controls);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Valid submit:', this.form.value);
  }
}
