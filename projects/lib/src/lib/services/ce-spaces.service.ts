import { Injectable } from '@angular/core';
import { AccountSettings } from '@codeffekt/ce-core-data';
import { CeCoreService } from './ce-core.service';

@Injectable({
  providedIn: 'root'
})
export class CeSpacesService {

  constructor(private coreService: CeCoreService) { }

  upsertAccount(account: AccountSettings): Promise<AccountSettings> {
    return this.coreService.callSpaces("upsertAccount", account).toPromise();
}
}
