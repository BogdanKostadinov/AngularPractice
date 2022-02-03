import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IStudent } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'pm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'Name', 'Surname', 'Age', 'Course', 'Actions'];
  dataSource: MatTableDataSource<IStudent>;
  users: IStudent[];
  errorMessage: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private studentService: StudentService, private _liveAnnouncer: LiveAnnouncer) { }

  ngAfterViewInit() {
    this.studentService.studentsWithCourses
      .subscribe((users: IStudent[]) => {
        this.users = users;
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

  deleteStudent(student: IStudent): void {
    this.studentService.deleteStudent(student).subscribe({
      next: () => this.onSaveComplete(),
      error: err => this.errorMessage = err
    });
  }

  onSaveComplete(): void {
    window.location.reload();
  }

}

