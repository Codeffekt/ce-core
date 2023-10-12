import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ce-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {

  searchBox: boolean;
  
  @Input() label: string;
  
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void { }

  setSearchBox(value: boolean) {
    this.searchBox = value;
    this.cdr.detectChanges();
  }
}
