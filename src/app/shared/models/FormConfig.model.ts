export interface SelectOption {
  label: string;
  value: any;
}

export interface ErrorMessageMap {
  required?: string;
  minlength?: string;
  maxlength?: string;
  [key: string]: string | undefined;
}

export type ValidatorRule = 'required' | `minLength:${number}` | `maxLength:${number}`;

export interface FormFieldConfig {
  type: string;
  label: string;
  formControlName: string;
  placeholder?: string;
  validators?: ValidatorRule[];
  options?: SelectOption[];
  errorMessages?: ErrorMessageMap;
}

export type FormConfig = FormFieldConfig[];
