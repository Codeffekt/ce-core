import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ce-navigation-account',
  templateUrl: './navigation-account.component.html',
  styleUrls: ['./navigation-account.component.scss']
})
export class NavigationAccountComponent implements OnInit {

  isOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
