import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BreadcrumbItem, CeBreadcrumbsService } from '@codeffekt/ce-core';

@Component({
  selector: 'app-navs-example',
  templateUrl: './navs-example.component.html',
  styleUrls: ['./navs-example.component.scss']
})
export class NavsExampleComponent implements OnInit {

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

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private breadcrumbService: CeBreadcrumbsService) { }

  ngOnInit(): void {
    this.initBreadcrumb();
    this.initInteractiveExampleForm();
  }


  private initInteractiveExampleForm() {
    this.form = this.formBuilder.group({
      content: 'navbar-item',
      showActions: false
    });
  }
  private initBreadcrumb() {
    const items = this.navItems.map(item => ({ label: item.label, url: null, data: null, id: null }))
    this.breadcrumbService.setItems(items);
  }
}
