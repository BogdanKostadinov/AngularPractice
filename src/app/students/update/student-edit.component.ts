import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Observable, Subscription } from 'rxjs';
import { Course } from '../../courses/course';
import { CourseService } from '../../courses/course.service';
import { Student } from '../student-model';
import { StudentService } from '../student.service';

@Component({
  selector: 'pm-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit, OnDestroy {

  studentForm: FormGroup;
  student = new Student();
  nameMessage: string;
  //student: IStudent | undefined;
  errorMessage: string = '';
  private sub: Subscription;
  courses$: Observable<Course[]>;


  get names(): FormArray {
    return <FormArray>this.studentForm.get('names');
  }

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private courseService: CourseService,
    private router: Router) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.courses$ = this.courseService.courses;

    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      surname: '',
      age: '',
      courseId: '',
    });

    const nameControl = this.studentForm.get('firstName');
    nameControl?.valueChanges.pipe(debounceTime(1000)).subscribe(value => this.setMessage(nameControl))

    this.sub = this.route.paramMap.subscribe(
      params => {
        let id = +params.get('id')!;
        this.getStudent(id);
      }
    )
  }

  getStudent(id: number): void {
    this.studentService.getStudent(id)
      .subscribe({
        next: (student: Student) => this.displayStudent(student),
        error: err => this.errorMessage = err
      });
  }

  displayStudent(student: Student): void {
    if (this.studentForm) {
      this.studentForm.reset();
    }
    this.student = student;

    this.studentForm.patchValue({
      firstName: this.student.firstName,
      surname: this.student.surname,
      age: this.student.age,
      courseId: this.student.courseId      
    })
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

  updateStudent(): void {
    if (this.studentForm.valid) {
      if (this.studentForm.dirty) {
        const p = { ...this.student, ...this.studentForm.value }

        this.studentService.updateStudent(p)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
      else{
        this.onSaveComplete();
      }
    }
    else{
      this.errorMessage = 'Please correct the errors.';
    }
  }

  changeClient(data: any): void {
    console.log(data);
  }

  onSaveComplete(): void {
    this.studentForm.reset();
    this.router.navigate(['/table'])
  }

  validationMessages: any = {
    required: "Please enter your name.",
    "firstName": 'Please enter your name.',
  };

}
