import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../shared/components/dynamic-form/dynamic-form';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [ReactiveFormsModule, DynamicFormComponent, CommonModule],
  templateUrl: './form-page.html',
})
export class FormPageComponent {}
