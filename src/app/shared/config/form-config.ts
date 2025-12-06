import { FormConfig } from '../models/FormConfig.model';

export const FORM_CONFIG: FormConfig = [
  {
    type: 'text',
    label: 'First Name',
    formControlName: 'firstName',
    placeholder: 'Enter first name',
    validators: ['required', 'minLength:3'],
    errorMessages: {
      required: 'First Name is required',
      minlength: 'Minimum 3 characters required',
    },
  },
  {
    type: 'text',
    label: 'Last Name',
    formControlName: 'lastName',
    placeholder: 'Enter last name',
    validators: ['required', 'minLength:3'],
    errorMessages: {
      required: 'Last Name is required',
      minlength: 'Minimum 3 characters required',
    },
  },
  {
    type: 'select',
    label: 'Country',
    formControlName: 'country',
    validators: ['required'],
    options: [
      { label: 'India', value: 'IN' },
      { label: 'USA', value: 'US' },
      { label: 'UK', value: 'UK' },
    ],
    errorMessages: {
      required: 'Please select a country',
    },
  },
];
