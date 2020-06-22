import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  fullNameLength = 0;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      email: ['', Validators.required],
      skills: this.fb.group({
        skillName: [''],
        exprienceInYears: [''],
        proficiency: [''],
      }),
    });
    this.employeeForm
      .get('fullName')
      .valueChanges.subscribe((value: string) => {
        this.fullNameLength = value.length;
      });

    // // for all group value
    // this.employeeForm.valueChanges.subscribe((value: any) => {
    //   console.log(value);
    // });

    // // only nesteg group value
    // this.employeeForm.get('skills').valueChanges.subscribe((value: any) => {
    //   console.log(value);
    // });
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

  logKeyValuePair(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePair(abstractControl);
        // abstractControl.disable();
      } else {
        console.log('key = ' + key + '  value = ' + abstractControl.value);
        abstractControl.disable();
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
