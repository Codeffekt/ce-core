import { Injectable } from '@angular/core';

import { AccountSettings } from '@codeffekt/ce-core-data';
import { firstValueFrom } from 'rxjs';
import { CeAccountService } from '../services/ce-account.service';

/**
 * Retrieve the all the users on the same account.
 * @see `CeAccountService`
 */
@Injectable({ providedIn: 'root' })
export class MembersResolverService  {
  constructor(
    private accountsService: CeAccountService) {
  }

  async resolve(): Promise<AccountSettings[]> {
    const members = await firstValueFrom(this.accountsService.getMembers());
    return members;
  }
}
