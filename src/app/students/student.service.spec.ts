import { ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { StudentService } from "./student.service";
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { Observable, of } from "rxjs";

describe('StudentService', () => {
    let mockStudentService: { createStudent: { and: { returnValue: (arg0: Observable<{ id: number; firstName: string; }>) => void; }; }; };
    let controller: HttpTestingController;
    let service: StudentService;

    beforeEach(() => {
        mockStudentService = jasmine.createSpyObj(['createStudent', 'getStudent']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                StudentService,
                // { provide: StudentService, useValue: mockStudentService }
            ]
        })

        controller = TestBed.inject(HttpTestingController);
        service = TestBed.inject(StudentService);
    })

    describe('Student', () => {
        it('should call GET with the correct URL', () => {
            //call getStudent()
            service.getStudent(2).subscribe();

            //test that the url is correct
            const req = controller.expectOne('http://localhost:8080/api/students/2');

            req.flush({ id: 2, firstName: 'boko', surname: 'roko', age: 24 });
            expect(req.request.method).toBe('GET');
            controller.verify();
        })

        it('should CREATE new student', () => {
            const name = 'bogi';
            const surname = 'drobi';
            const age = 25;

            mockStudentService.createStudent.and.returnValue(of({ id: 4, firstName: name, surname: surname, age: age }))

            
        })
    })


})