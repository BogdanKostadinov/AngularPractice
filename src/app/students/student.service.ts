import { Injectable } from "@angular/core";
import { IStudent } from "./student";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { combineLatest, Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Student } from "./student-model";
import { CourseService } from "../courses/course.service";


@Injectable({
    providedIn: 'root',
})

export class StudentService {
    private studentUrl = 'http://localhost:8080/api/students'

    constructor(private http: HttpClient, private courseService: CourseService) { }

    students = this.http.get<IStudent[]>(this.studentUrl)
        .pipe(
            catchError(this.handleError)
        );

    studentsWithCourses = combineLatest([
        this.students,
        this.courseService.courses
    ]).pipe(
        map(([students, courses]) =>
            students.map(student => ({
                ...student,
                courseName: courses.find(c => student.courseId === c.id)?.courseName
            }) as IStudent),
        )
    )

    getStudents(): Observable<IStudent[]> {

        return this.http.get<IStudent[]>(this.studentUrl).pipe(
            //tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getStudent(id: number): Observable<IStudent> {
        const url = `${this.studentUrl}/${id}`
        return this.http.get<IStudent>(url)
            .pipe(
                tap(data => console.log('getStudent: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    createStudent(student: IStudent): Observable<IStudent> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post<IStudent>(this.studentUrl, student, { headers: headers })
            .pipe(
                tap(data => console.log('addStudent: ' + student.id)),
                map(() => student),
                catchError(this.handleError)
            );
    }

    updateStudent(student: IStudent): Observable<IStudent> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.studentUrl}/update/${student.id}`;
        return this.http.put<Student>(url, student, { headers: headers })
            .pipe(
                tap(data => console.log('updateStudent: ' + student.id)),
                map(() => student),
                catchError(this.handleError)
            );
    }

    deleteStudent(student: IStudent): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.studentUrl}/${student.id}`;

        return this.http.delete<Student>(url, { headers: headers });
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';

        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`
        }
        else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}