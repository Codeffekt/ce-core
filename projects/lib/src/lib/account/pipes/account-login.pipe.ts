import { Pipe, PipeTransform } from '@angular/core';
import { AccountSettings, IndexType } from '@codeffekt/ce-core-data';

@Pipe({ name: 'accountLogin' })
export class AccountLoginPipe implements PipeTransform {
    transform(aid: IndexType, accounts: AccountSettings[]): string | undefined {
        const account = accounts.find(account => account.id === aid);
        return account?.login;
    }
}
