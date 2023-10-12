import { Component, Input, OnInit } from '@angular/core';
import { SearchToken } from '../search-token';
import { SearchTokensService } from '../services/search-tokens-service';

@Component({
  selector: 'ce-search-token',
  templateUrl: './search-token.component.html',
  styleUrls: ['./search-token.component.scss']
})
export class SearchTokenComponent implements OnInit {

  @Input() searchToken: SearchToken;

  constructor(private tokensService: SearchTokensService) { }

  ngOnInit(): void {
  }

  remove() {
    this.tokensService.removeToken(this.searchToken);
  }

}
