import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-nav',
  templateUrl: './tasks-nav.component.html',
  styleUrls: ['./tasks-nav.component.scss']
})
export class TasksNavComponent implements OnInit {

  navItems = [{
    label: "Campagnes",
    id: ""
  }, {
    label: "Campagnes - T1",
    id: ""
  },
  {
    label: "Entreprise - E1",
    id: ""
  },
  {
    label: "Context",
    id: ""
  }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
