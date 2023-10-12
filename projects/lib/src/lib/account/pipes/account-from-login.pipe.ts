import { Pipe, PipeTransform } from '@angular/core';
import { AccountSettings } from '@codeffekt/ce-core-data';
import { CeAccountService } from '../../services';

@Pipe({
    name: 'accountFromLogin'
})
export class AccountFromLoginPipe implements PipeTransform {

    constructor(private accountService: CeAccountService) { }

    transform(login: string, ...args: any[]): AccountSettings {
        return this.accountService.getMemberFromLogin(login);
    }
}