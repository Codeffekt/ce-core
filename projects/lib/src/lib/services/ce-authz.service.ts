import { Injectable } from '@angular/core';
import { AccountAppActions, AccountAuthZ, AccountSettings } from '@codeffekt/ce-core-data';
import { CeCoreService } from './ce-core.service';

@Injectable({providedIn: 'root'})
export class CeAuthZService {

    constructor(private diagApiService: CeCoreService) { }

    isSuperAdmin() {
        return this.getCurrentAccount().account === "admin";
    }

    isAdmin(): boolean {
        return this.getCurrentAccount()?.role === "admin";
    }

    checkResourceActionsPermission(resource: string, actions: AccountAppActions[]): boolean {
        const _currentAccount = this.getCurrentAccount();

        if (!_currentAccount || !_currentAccount.authz) {
            return false;
        }

        const accountAuthZ = _currentAccount.authz[resource];
        if (!accountAuthZ) {
            const parentAuthZ = this.getParentResourceAuthZ(resource, _currentAccount);
            // TODO parent action shoud only match specified actions
            return parentAuthZ !== undefined && parentAuthZ.actions.includes("all");
        }

        const permitted = actions.some(action => accountAuthZ.actions.includes(action));
        return permitted;
    }

    private getParentResourceAuthZ(resource: string, account: AccountSettings): AccountAuthZ|undefined {

        if (!account || !account.authz) {
            return undefined;
        }

        const elts = resource.split(".");
        if(elts.length <= 1) {
            return undefined;
        }

        const parentResource = elts.slice(0, elts.length-1).join(".");
        return account.authz[parentResource];
    }

    private getCurrentAccount(): AccountSettings {
        return this.diagApiService.getCurrentUser()?.settings;
    }
}