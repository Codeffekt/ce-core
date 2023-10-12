import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem, CeBreadcrumbsService } from '@codeffekt/ce-core';

const SOME_BREADCRUMBS_ITEMS: BreadcrumbItem[] = [
  {
    id: "0",
    label: "Dev", 
    data: null,
    url: "Dev"
  }, {
    id: "1",
    label: "Codeffekt", 
    data: null,
    url: "Codeffekt"
  }, {
    id: "2", 
    label: "Test 2", 
    data: null,
    url: "Codeffekt"
  }, {
    id: "3",    
    label: "Test 3", 
    data: null,
    url: "Codeffekt"
  }, {
    id: "4",
    label: "Src", 
    data: null,
    url: "Src"
  }, {
    id: "5",
    label: "App", 
    data: null,
    url: "App"
  }
];

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  activeItem$ = this.bcService.activeItem$;

  constructor(private bcService: CeBreadcrumbsService) { }

  ngOnInit(): void {
    const defaultItems = SOME_BREADCRUMBS_ITEMS.map(item => ({
      ...item
    }));

    this.bcService.setItems(defaultItems);
  }

  addBreadcrumb() {
    const item = SOME_BREADCRUMBS_ITEMS[Math.floor(Math.random() * SOME_BREADCRUMBS_ITEMS.length)];
    const newItem = { ...item, id: `${item.id}_0` };    
    const currentItems = this.bcService.getLastItems();
    this.bcService.setItems([...currentItems, newItem]);
  }

  removeBreadcrumb() {
    const currentItems = this.bcService.getLastItems();
    this.bcService.setItems(currentItems.slice(1));
  }
}
