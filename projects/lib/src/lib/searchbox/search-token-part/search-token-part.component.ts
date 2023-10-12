import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { SearchTokenPartType } from '../services/search-tokens-service';


@Component({
  selector: 'ce-search-token-part',
  templateUrl: './search-token-part.component.html',
  styleUrls: ['./search-token-part.component.scss']
})
export class SearchTokenPartComponent implements OnInit {

  @Input()
  @HostBinding('class')
  type: SearchTokenPartType;

  constructor() { }

  ngOnInit(): void {
  }

}
