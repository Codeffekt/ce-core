import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LayoutService } from '@codeffekt/ce-core';

@Component({
  selector: 'app-examples-main',
  templateUrl: './examples-main.component.html',
  styleUrls: ['./examples-main.component.scss']
})
export class ExamplesMainComponent implements OnInit, AfterViewInit {

  @ViewChild(MatDrawer) drawer!: MatDrawer;

  constructor(
    private router: Router,
    private layout: LayoutService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.layout.setDrawer(this.drawer);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

}
