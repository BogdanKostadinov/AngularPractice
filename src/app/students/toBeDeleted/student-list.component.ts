import { Component, OnInit } from "@angular/core";
import { catchError, EMPTY, Observable, of, Subscription, tap } from "rxjs";
import { IStudent } from "../student";
import { StudentService } from "../student.service";

@Component
    ({
        templateUrl: './student-list.component.html',
        styleUrls: ['./student-list.component.css']
    })

export class StudentListComponent {

    pageTitle: string = "Students list";
    showIds: boolean = false;
    changeColor: boolean = false;
    errorMessage: string = "";
    sub: Subscription;
    filteredStudents: IStudent[] = [];

    constructor(private studentService: StudentService,
    ) { }


    toggleIds(): void {
        this.showIds = !this.showIds;
    }


    students$ = this.studentService.studentsWithCourses
        .pipe(
            // tap(data=> console.log(data)),
            catchError(err => {
                this.errorMessage = err;
                return EMPTY;
            })
        );


    deleteStudent(student: IStudent): void {
        this.studentService.deleteStudent(student).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
        });
    }


    onSaveComplete(): void {
        window.location.reload();
    }


    // performFilter(filterBy: string): IStudent[] {
    //     filterBy = filterBy.toLocaleLowerCase();
    //     return this.students$.filter((student: IStudent) =>
    //         student.firstName.toLocaleLowerCase().includes(filterBy));
    // }

    // ngOnInit(): void {
    //     this.sub = this.studentService.getStudents().subscribe({
    //         next: students => {
    //             this.students = students;
    //             this.filteredStudents = this.students;
    //         },
    //         error: err => this.errorMessage = err
    //     });
    // }

    // ngOnDestroy(): void {
    //     this.sub.unsubscribe();
    // }

    // deleteStudent(id: number): void {
    //     this.studentService.deleteStudent(id).subscribe({
    //         next: () => this.onSaveComplete(),
    //         error: err => this.errorMessage = err
    //     });
    // }

    // private _listFilter: string = "";
    // get listFilter(): string {
    //     return this._listFilter;
    // }
    // set listFilter(value: string) {
    //     this._listFilter = value;
    //     this.filteredStudents = this.performFilter(value);
    // }
}

