import { Component, OnInit } from '@angular/core';
import { CeFormQueryService } from '@codeffekt/ce-core';
import { FormInstance } from '@codeffekt/ce-core-data';
import { MockApiService } from '../../api/mock-api.service';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.scss'],
  providers: [
    CeFormQueryService
  ]
})
export class FormsListComponent implements OnInit {

  forms: FormInstance[];

  constructor(private readonly apiService: MockApiService) { }

  ngOnInit(): void {
    this.forms = this.apiService.getAllFormInstances();
  }
}
