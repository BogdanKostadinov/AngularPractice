import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Student } from './student-model';

@Component({
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {

  studentForm: FormGroup;
  student = new Student();
  nameMessage: string;

  get names(): FormArray {
    return <FormArray>this.studentForm.get('names');
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      surname: '',
      age: '',
      myCheckbox: false,
      names: this.fb.array([this.buildDynamically()])
    });

    const nameControl = this.studentForm.get('firstName');
    nameControl?.valueChanges.pipe(debounceTime(1000)).subscribe(value => this.setMessage(nameControl))
  }

  setMessage(c: AbstractControl): void {
    this.nameMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.nameMessage = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
    }
  }

  populateTestData(): void {
    this.studentForm.patchValue({
      firstName: "Boko",
      surname: "Javoko",
    })
  }

  buildDynamically(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      surname: '',
      age: '',
      myCheckbox: false,
    })
  };

  addDynamically(): void {
    this.names.push(this.buildDynamically());
  }

  save(): void { }

  validationMessages: any = {
    required: "Please enter your name.",
    "firstName": 'Please enter your name.',
  };

}
