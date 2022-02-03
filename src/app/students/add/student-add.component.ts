import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, debounceTime, EMPTY, Observable, pipe, tap } from 'rxjs';
import { Course } from '../../courses/course';
import { CourseService } from '../../courses/course.service';
import { Student } from '../student-model';
import { StudentService } from '../student.service';


@Component({
  selector: 'pm-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  studentForm: FormGroup;
  student = new Student();
  nameMessage: string;
  errorMessage: string = '';
  courses$: Observable<Course[]>;
  courseId: number;

  //firstName = new FormControl('', [Validators.required, Validators.minLength(3)]);

  get names(): FormArray {
    return <FormArray>this.studentForm.get('names');
  }

  constructor(private fb: FormBuilder,
    private studentService: StudentService,
    private courseService: CourseService,
    private router: Router) { }

  ngOnInit(): void {

    this.courses$ = this.courseService.courses
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
      );

    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      surname: '',
      age: '',
      courseId: '',
    });

    const nameControl = this.studentForm.get('firstName');
    nameControl?.valueChanges.pipe(debounceTime(1000)).subscribe(value => this.setMessage(nameControl))
  }

  changeClient(value: any) {
    console.log(value);
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
      age: 24,
      courseId: 5,
    })
  }

  save(): void {
    if (this.studentForm.valid) {
      const p = { ...this.student, ...this.studentForm.value }

      this.studentService.createStudent(p)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });;
    }
    else {
      this.errorMessage = 'Please correct the errors.';
    }
  }

  onSaveComplete(): void {
    this.studentForm.reset();
    this.router.navigate(['/table'])
  }

  validationMessages: any = {
    required: "Please enter your name.",
    "firstName": 'Please enter your name.',
  };

  onBack(): void {
    this.router.navigate(['/table']);
  }

}
