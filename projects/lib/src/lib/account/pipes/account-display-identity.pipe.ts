import { Pipe, PipeTransform } from '@angular/core';
import { AccountSettings } from '@codeffekt/ce-core-data';

@Pipe({ name: 'identityLabel' })
export class AccountIdentityLabelPipe implements PipeTransform {
    transform(account: AccountSettings, defaultValue?: string): string {
        if (!account.firstName && !account.lastName) {
            return defaultValue ?? account.login;
        }

        const firstName = capitalizeFirstLetter(account.firstName!);
        const lastName = capitalizeFirstLetter(account.lastName!);
        return `${firstName} ${lastName}`.trim();
    }
}

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}