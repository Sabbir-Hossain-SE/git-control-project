import { CustomValidators } from './../shared_from_validator/custom-validators';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  FormArray,
} from '@angular/forms';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  skillArray;
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
    emailGroup: { emailMismatch: 'Confirmation error is not matched.' },
    confirmEmail: {
      required: 'Confirm Email is required. ',
    },
    phone: {
      required: 'Phone number is required.',
      minlength: 'Full name must be greater then 2 character.',
      maxlength: 'Full name must be less then 10 character.',
    },
    // skillName: {
    //   required: 'Skill name is required.',
    // },
    // exprienceInYears: {
    //   required: 'Exprience is required.',
    // },
    // proficiency: {
    //   required: 'proficiency is required.',
    // },
  };
  formError = {
    fullName: '',
    email: '',
    confirmEmail: '',
    emailGroup: '',
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

      emailGroup: this.fb.group(
        {
          email: [
            '',
            [
              Validators.required,
              Validators.email,
              CustomValidators.emailDomain('custom.com'),
            ],
          ],
          confirmEmail: ['', Validators.required],
        },
        { validator: matchEmail }
      ),
      phone: [''],
      // skills: this.fb.group({
      //   skillName: ['', Validators.required],
      //   exprienceInYears: ['', Validators.required],
      //   proficiency: ['', Validators.required],
      // }),
      skills: this.fb.array([this.addSkillFormGroup()]),
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
    this.skillArray = (this.employeeForm.get('skills') as FormArray).controls;
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
  addskillButtonClick(): any {
    (this.employeeForm.get('skills') as FormArray).push(
      this.addSkillFormGroup()
    );
  }
  removeSkillButtonClick(skillGroupIndex): void {
    (this.employeeForm.get('skills') as FormArray).removeAt(skillGroupIndex);
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      exprienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required],
    });
  }

  onContactPreferenceChange(contact: string) {
    const phoneControl = this.employeeForm.get('phone');
    const emailGroup = this.employeeForm.get('emailGroup');
    // const confirmEmailControl = this.employeeForm.get('confirmEmail');
    if (contact === 'phone') {
      phoneControl.setValidators([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]);
      emailGroup.get('email').clearValidators();
      emailGroup.get('confirmEmail').clearValidators();
    } else {
      emailGroup
        .get('email')
        .setValidators([
          Validators.required,
          Validators.email,
          CustomValidators.emailDomain('custom.com'),
        ]);
      emailGroup
        .get('confirmEmail')
        .setValidators([
          Validators.required,
          Validators.email,
          CustomValidators.emailDomain('custom.com'),
        ]);
      phoneControl.clearValidators();
    }
    emailGroup.get('email').updateValueAndValidity();
    emailGroup.get('confirmEmail').updateValueAndValidity();
    phoneControl.updateValueAndValidity();
  }

  // logValidationErrors(group: FormGroup = this.employeeForm): void {
  //   Object.keys(group.controls).forEach((key: string) => {
  //     const abstractControl = group.get(key);
  //     if (abstractControl instanceof FormGroup) {
  //       this.logValidationErrors(abstractControl);
  //       // abstractControl.disable();
  //     } else {
  //       this.formError[key] = '';
  //       if (
  //         abstractControl &&
  //  /       !abstractControl.valid &&
  //         (abstractControl.touched || abstractControl.dirty)
  //       ) {
  //         const message = this.validationMessages[key];
  //         for (const errorKey in abstractControl.errors) {
  //           if (errorKey) {
  //             this.formError[key] += message[errorKey];
  //           }
  //         }
  //       }
  //     }
  //   });
  // }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

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

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
        // abstractControl.disable();
      }
      // if (abstractControl instanceof FormArray) {
      //   for (const control of abstractControl.controls) {
      //     if (control instanceof FormGroup) {
      //       this.logValidationErrors(control);
      //     }
      //   }
      // }
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

    // // Use of fromArray
    // const formArray = new FormArray([
    //   new FormControl('anc', Validators.required),
    //   new FormGroup({ country: new FormControl('def', Validators.required) }),
    //   new FormArray([]),
    // ]);
    // console.log(formArray.length);
    // for (const control of formArray.controls) {
    //   if (control instanceof FormControl) {
    //     console.log('control is FormControl');
    //   }
    //   if (control instanceof FormArray) {
    //     console.log('control is FormArray');
    //   }
    //   if (control instanceof FormGroup) {
    //     console.log('control is FormGroup');
    //   }
    // }
    // serialize like an array
    const formArray = this.fb.array([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('Mark', Validators.required),
    ]);
    // serialize like an object
    const formGroup = this.fb.group([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('Mark', Validators.required),
    ]);
    formArray.push(new FormControl('New', Validators.required));
    console.log(formArray.at(3).value);
    console.log(formArray);
    console.log(formGroup);
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
function matchEmail(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');
  if (
    emailControl.value === confirmEmailControl.value ||
    confirmEmailControl.pristine
  ) {
    return null;
  } else {
    return { emailMismatch: true };
  }
}
