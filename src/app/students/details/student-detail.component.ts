import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from '../student';
import { StudentService } from '../student.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { GradeService } from 'src/app/grades/grade.service';
import { Grade } from 'src/app/grades/grade';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  pageTitle: string = "Student details for "
  student: IStudent | undefined;
  grade: Grade | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  errorMessage = '';

  displayedColumns: string[] = ['id', 'Subject', 'Score', 'Status'];
  dataSource: MatTableDataSource<Grade>;
  grades: Grade[];

  constructor(private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private gradeService: GradeService,
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getStudent(id);
    }
    this.gradeService.getStudentGrades(id).subscribe((grades: Grade[]) => {
      this.grades = grades;
      this.dataSource = new MatTableDataSource(grades);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.pageTitle;
  }


  getStudent(id: number): void {
    this.studentService.getStudent(id).subscribe({
      next: student => this.student = student,
      error: err => this.errorMessage = err
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onBack(): void {
    this.router.navigate(['/table']);
  }


}
