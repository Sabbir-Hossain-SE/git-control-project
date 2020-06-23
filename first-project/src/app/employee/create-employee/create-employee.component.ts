import { CustomValidators } from './../shared_from_validator/custom-validators';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  fullNameLength = 0;
  validationMessages = {
    fullName: {
      required: 'Full name is required.',
      minlength: 'Full name must be greater then 2 character.',
      maxlength: 'Full name must be less then 10 character.',
    },
    email: {
      required: 'Email is required.',
      email: 'Please follow the proper syntax form email.',
      emailDomain: ' Email domain should be [custom.com].',
    },
    phone: {
      required: 'Phone number is required.',
      minlength: 'Full name must be greater then 2 character.',
      maxlength: 'Full name must be less then 10 character.',
    },
    skillName: {
      required: 'Skill name is required.',
    },
    exprienceInYears: {
      required: 'Exprience is required.',
    },
    proficiency: {
      required: 'proficiency is required.',
    },
  };
  formError = {
    fullName: '',
    email: '',
    phone: '',
    skillName: '',
    exprienceInYears: '',
    proficiency: '',
  };
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],
      contact: ['email'],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          CustomValidators.emailDomain('custom.com'),
        ],
      ],
      phone: [''],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        exprienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required],
      }),
    });
    // this.employeeForm
    //   .get('fullName')
    //   .valueChanges.subscribe((value: string) => {
    //     this.fullNameLength = value.length;
    //   });

    // // for all group value
    // this.employeeForm.valueChanges.subscribe((value: any) => {
    //   console.log(value);
    // });

    // // only nesteg group value
    // this.employeeForm.get('skills').valueChanges.subscribe((value: any) => {
    //   console.log(value);
    // });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });
  }

  // ngOnInit(): void {
  //   this.employeeForm = new FormGroup({
  //     fullName: new FormControl(),
  //     email: new FormControl(),
  //     skills: new FormGroup({
  //       skillName: new FormControl(),
  //       exprienceInYears: new FormControl(),
  //       proficiency: new FormControl(),
  //     }),
  //   });
  // }

  // logKeyValuePair(group: FormGroup): void {
  //   Object.keys(group.controls).forEach((key: string) => {
  //     const abstractControl = group.get(key);
  //     if (abstractControl instanceof FormGroup) {
  //       this.logKeyValuePair(abstractControl);
  //       // abstractControl.disable();
  //     } else {
  //       console.log('key = ' + key + '  value = ' + abstractControl.value);
  //       abstractControl.disable();
  //     }
  //   });
  // }
  onContactPreferenceChange(contact: string) {
    const phoneControl = this.employeeForm.get('phone');
    const emailControl = this.employeeForm.get('email');
    if (contact === 'phone') {
      phoneControl.setValidators([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]);
      emailControl.clearValidators();
    } else {
      emailControl.setValidators([
        Validators.required,
        Validators.email,
        CustomValidators.emailDomain('custom.com'),
      ]);
      phoneControl.clearValidators();
    }
    emailControl.updateValueAndValidity();
    phoneControl.updateValueAndValidity();
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
        // abstractControl.disable();
      } else {
        this.formError[key] = '';
        if (
          abstractControl &&
          !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)
        ) {
          const message = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formError[key] += message[errorKey];
            }
          }
        }
      }
    });
  }

  onLoadDataClick(): void {
    // this.logKeyValuePair(this.employeeForm);
    // // Load/set static data on specific form control
    // this.employeeForm.patchValue({
    //   fullName: 'Sabbir Hossain',
    //   email: 'sab@gmail.com',
    //   skills: {
    //     skillName: 'C#',
    //     exprienceInYears: '5',
    //     proficiency: 'advance',
    //   },
    // });
  }

  onSubmit(): void {
    console.log(this.employeeForm.touched);
    console.log(this.employeeForm.value);

    console.log(this.employeeForm.controls.fullName.touched);
    console.log(this.employeeForm.get('fullName').value);
  }
}
// // custom validator with static value
// function emailDomain(control: AbstractControl): { [key: string]: any } | null {
//   const email: string = control.value;
//   const domain = email.substring(email.lastIndexOf('@') + 1);
//   if (email === '' || domain.toLowerCase() === 'custom.com') {
//     return null;
//   } else {
//     return { emailDomain: true };
//   }
// }

// // custom validator with dynamie value
// function emailDomain(domainName: string) {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//     const email: string = control.value;
//     const domain = email.substring(email.lastIndexOf('@') + 1);
//     if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
//       return null;
//     } else {
//       return { emailDomain: true };
//     }
//   };
// }
