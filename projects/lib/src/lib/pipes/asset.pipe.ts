import { Pipe, PipeTransform } from '@angular/core';
import { AssetElt, FormWrapper, IndexType } from '@codeffekt/ce-core-data';
import { CeCoreService } from '../services/ce-core.service';

@Pipe({ name: 'thumbPath' })
export class AssetThumbnailPipe implements PipeTransform {

  constructor(private apiService: CeCoreService) { }

  transform(asset: FormWrapper<any>, args: number): string | undefined {
    const dimension = args;
    return (asset && asset.core.id) ? this.apiService.thumbPathFromAssetId(asset.core.id, dimension) : undefined;
  }
}

@Pipe({ name: 'thumbPathAssetElt' })
export class AssetEltThumbnailPipe implements PipeTransform {

  constructor(private apiService: CeCoreService) { }

  transform(asset: AssetElt, args: number): string | undefined {
    const dimension = args;
    return (asset && asset.id) ? this.apiService.thumbPathFromAssetId(asset.id, dimension) : undefined;
  }
}

@Pipe({ name: 'thumbPathWithAssetId' })
export class AssetThumbnailWithIdPipe implements PipeTransform {

  constructor(private apiService: CeCoreService) { }

  transform(assetId: IndexType, args: number): string | undefined {
    const dimension = args;
    return (assetId) ? this.apiService.thumbPathFromAssetId(assetId, dimension) : undefined;
  }
}

@Pipe({ name: 'originalSizeImage' })
export class AssetOriginalSizeImage implements PipeTransform {

  constructor(private apiService: CeCoreService) { }

  transform(asset: AssetElt, args?: any): string | undefined {    
    return (asset && asset.id) ? this.apiService.imagePathFromAssetId(asset.id) : undefined;
  }
}

@Pipe({ name: 'assetUrl'})
export class AssetUrl implements PipeTransform {
  constructor(private apiService: CeCoreService) { }

  transform(asset: AssetElt, args?: any): string | undefined {    
    return (asset && asset.id) ? this.apiService.urlFromAssetId(asset.id) : undefined;
  }
}
