import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  constructor(private router: Router,) {
  }

  navigateTo(page: string) {
    switch (page) {
      case "student-add":
        this.router.navigate(['/students/add']);
        break;

      case "student-list":
        this.router.navigate(['/table']);
        break;

      default:
        this.router.navigate(['/welcome']);
        break;
    }
  }
}
