import { Injectable } from '@angular/core';
import { AccountSettings, IndexType, SpacesEditorFormat } from '@codeffekt/ce-core-data';
import { CeCoreService } from './ce-core.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CeSpacesService {

  constructor(private coreService: CeCoreService) { }

  upsertAccount(account: AccountSettings): Promise<AccountSettings> {
    return firstValueFrom(this.coreService.callSpaces("upsertAccount", account));
  }

  getSpaceEditor(id: IndexType): Promise<SpacesEditorFormat> {
    return firstValueFrom(this.coreService.callSpacesEditor("getEditorFormat", id));
  }

  updateSpaceEditor(id: IndexType, format: SpacesEditorFormat) {
    return firstValueFrom(this.coreService.callSpacesEditor("updateEditorFormat", id, format));
  }
}
