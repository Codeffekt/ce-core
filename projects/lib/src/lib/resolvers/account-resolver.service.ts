import { Injectable } from '@angular/core';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AccountSettings } from '@codeffekt/ce-core-data';
import { CeAccountService } from '../services/ce-account.service';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountResolverService implements Resolve<AccountSettings> {
  constructor(
    private accountsService: CeAccountService,
    private router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<AccountSettings> {
    const id = route.paramMap.get('account');
    const account = await firstValueFrom(this.accountsService.getAccount(id));
    if (account && Object.keys(account).length) {
      return account;
    } else { // id not found
      this.router.navigate(['/']);
      return null;
    }
  }
}
