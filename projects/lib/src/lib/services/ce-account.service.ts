import { Injectable } from '@angular/core';
import { AccountSettings, IndexType } from '@codeffekt/ce-core-data';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CeCoreService, LocalUserSettings } from './ce-core.service';

/**
 * Service that wraps ce-core api to manage
 * information about users
 */
@Injectable({
  providedIn: 'root'
})
export class CeAccountService {

  private members: AccountSettings[] = [];

  constructor(private ceCore: CeCoreService) { }

  self(): Observable<LocalUserSettings> {
    return this.ceCore.self();
  }

  /**
   * You MUST have called `getMembers` before
   * @see `MembersResolverService`
   * @see `getMembers`   
   * @returns the cached list of users
   */
  getCurrentMembers() {
    return this.members;
  }

  /**
   * You MUST have called `getMembers` before
   * @see `MembersResolverService`
   * @see `getMembers`   
   * @returns the cached member from its login
   */
  getMemberFromLogin(login: string) {
      const member = this.members.find(member => member.login === login);
      if(!member) {
        throw new Error(`Member with login ${login} not found, you may have forgotten to call getMembers() from MembersResolverService`);
      }
      return member;
  }

  /**
   * Fetch users on the same account and then cache
   * the result in the service.
   * Please use the combination of `MembersResolverService`
   * and `getCurrentMembers` whenever its possible.
   * @see {@link getCurrentMembers}
   * @see `MembersResolverService`
   * @returns the list of users on the same account
   */
  getMembers(): Observable<AccountSettings[]> {
    return this.ceCore.callAccount("getMembers").pipe(
      tap(members => this.members = members)
    )
  }

  getAll(pid: IndexType, limit: number = 0, offset: number = 0): Observable<AccountSettings[]> {
    return this.ceCore.callProject("getUsers", pid, limit, offset);
  }

  getAllSuperAdmin(limit: number = 0, offset: number = 0): Observable<AccountSettings[]> {
    return this.ceCore.callAccount("getAll", limit, offset);
  }  

  getCount(pid: IndexType): Observable<number> {
    return this.ceCore.callProject("getUsersCount", pid);
  }

  get(id: IndexType): Observable<AccountSettings> {
    return this.ceCore.callAccount("get", id);
  }

  getAccount(id: IndexType): Observable<AccountSettings> {
    return this.ceCore.callAccount("getAccount", id);
  }

  remove(id: IndexType): Observable<boolean> {
    return this.ceCore.callAccount("remove", id);
  }

  update(account: AccountSettings) {    
    return this.ceCore.callAccount("update", account);
  }

  create(account: Partial<AccountSettings>, passwd: string): Observable<AccountSettings> {
    return this.ceCore.callAccount("create", account, passwd);
  }

  getRooms(): Observable<string[]> {
    return this.ceCore.callAccount("getRooms");
  }

  createAccount(account: AccountSettings, password: string): Observable<AccountSettings> {
    return this.ceCore.callAccount("create", account, password);
  }

  updatePassword(id: IndexType, password: string): Observable<AccountSettings> {
    return this.ceCore.callAccount("updatePassword", id, password);
  }

  updateProjectsAccounts(pids: IndexType[], aids: IndexType[]) {
    return this.ceCore.callAccount("updateProjectsAccounts", pids, aids);
  }
}
