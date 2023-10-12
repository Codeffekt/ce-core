import { Component, OnInit } from '@angular/core';
import { AssetsDatasource, AssetsFormQueryBuilder, CeAssetsService, CeFormQueryService } from '@codeffekt/ce-core';
import { AssetElt, FormWrapper } from '@codeffekt/ce-core-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
  providers: [
    CeFormQueryService
  ]
})
export class AssetsComponent implements OnInit {

  assetsDatasource!: AssetsDatasource;

  assets$: Observable<readonly AssetElt[]>;

  constructor(
    private readonly queryService: CeFormQueryService<AssetElt>,    
    assetsService: CeAssetsService
  ) { 
    this.assetsDatasource = new AssetsDatasource(assetsService);
    this.queryService.setQueryBuilder(new AssetsFormQueryBuilder().withPhotoMode());
    this.queryService.setDatasource(this.assetsDatasource);
    
    this.assets$ = this.queryService.connect();
  }

  ngOnInit(): void {
  }

}
