import { NgModule } from '@angular/core';
import { StudentListComponent } from './toBeDeleted/student-list.component';
import { StudentDetailGuard } from './details/student-detail.guard';
import { StudentDetailComponent } from './details/student-detail.component';
import { ConvertToSlashes } from '../shared/convert-to-slashes.pipe';
import { ConvertBooleans } from '../shared/convert-booleans.pipe';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StudentComponent } from './student.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentEditComponent } from './update/student-edit.component';
import { StudentAddComponent } from './add/student-add.component';
import { TableComponent } from './table/table.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    StudentListComponent,
    StudentDetailComponent,
    ConvertToSlashes,
    ConvertBooleans,
    StudentComponent,
    StudentEditComponent,
    StudentAddComponent,
    TableComponent,
  ],
  imports: [
    MaterialModule,
    RouterModule.forChild([
      { path: 'students', component: StudentListComponent },
      { path: 'students/add', component: StudentAddComponent },
      { path: 'students/edit/:id', component: StudentEditComponent },
      {
        path: 'students/:id',
        canActivate: [StudentDetailGuard],
        component: StudentDetailComponent
      },

    ]),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
