import { Component } from "@angular/core"

@Component({
  selector: 'pm-root',
  template: `
  <mat-toolbar color="primary">
    <a routerLinkActive='active' [routerLink]="['/welcome']">
      <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
        <mat-icon>home</mat-icon>
      </button>
    </a>
    <span>Angular Practice</span>

    <span class="example-spacer"></span>
    <a class='nav-link' routerLinkActive='active' [routerLink]="['/table']">
      <button mat-icon-button class="example-icon" aria-label="Example icon-button with heart icon">
        <mat-icon>list_alt</mat-icon>
      </button>
    </a>

    <a class='nav-link' routerLinkActive='active' [routerLink]="'/students/add'" >
      <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
         <mat-icon>person_add</mat-icon> 
      </button>
    </a>
  </mat-toolbar>
  <div class="container">
    <router-outlet></router-outlet>
   </div>
    `,
    styleUrls: ['app.component.css']
  })


export class AppComponent{
  pageTitle: string = "AngularPractice"
}