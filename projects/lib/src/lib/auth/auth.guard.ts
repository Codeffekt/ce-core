import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CeCoreService } from '../services/ce-core.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private coreService: CeCoreService
  ) { }

  async canActivate() {
    const isLogged = await this.coreService.persistent();

    if (!isLogged) {
      this.router.navigate(['/login']);
      return false;
    }    
    return true;
  }

}
