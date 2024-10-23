import { Pipe, PipeTransform } from '@angular/core';
import { AccountSettings } from '@codeffekt/ce-core-data';

@Pipe({
    name: 'nameOrAccount'
})
export class NameOrAccountPipe implements PipeTransform {
    
    transform(accountSettings?: AccountSettings|null): string | undefined {

        if (!accountSettings) {
            return undefined;
        }

        if (accountSettings.firstName || accountSettings.lastName) {
            return `${accountSettings.firstName} ${accountSettings.lastName}`.trim();
        }

        return accountSettings.account;
    }
}