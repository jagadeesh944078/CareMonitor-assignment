export const FORM_CONFIG = [
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
