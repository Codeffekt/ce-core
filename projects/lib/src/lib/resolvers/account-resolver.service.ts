import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { FormAccountWrapper } from '@codeffekt/ce-core-data';
import { CeAccountService } from '../services/ce-account.service';

@Injectable({ providedIn: 'root' })
export class AccountResolverService  {
  constructor(
    private accountsService: CeAccountService,
    private router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FormAccountWrapper> {
    const id = route.paramMap.get('account');
    const account = await this.accountsService.getAccountFromForm(id as any);
    if (account) {
      return new FormAccountWrapper(account);
    } else { // id not found
      this.router.navigate(['/']);
      return null as any;
    }
  }
}
