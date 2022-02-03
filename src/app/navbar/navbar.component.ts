import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showFiller: boolean;

  constructor() { }

  ngOnInit(): void {
    this.showFiller = false;
  }

}
