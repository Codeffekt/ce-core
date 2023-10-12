import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CeCoreService } from '../../services/ce-core.service';

@Component({
  selector: 'ce-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: CeCoreService) { }

  ngOnInit(): void {
    this.logout();
  }

  private async logout() {
    await this.apiService.logOut();
    this.router.navigate(['/login']);
  }
}
