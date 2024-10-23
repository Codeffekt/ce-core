import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountSettings } from '@codeffekt/ce-core-data';
import { map, Observable } from 'rxjs';
import { CeAccountService } from '../../../services/ce-account.service';

@Component({
  selector: 'ce-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.scss']
})
export class AccountDialogComponent implements OnInit {

  account$!: Observable<AccountSettings>;

  constructor(
    private router: Router,
    private accountSettings: CeAccountService,
  ) {
  }

  ngOnInit(): void {
    this.account$ = (this.accountSettings.self()).pipe(map(user => user.settings));
  }

  logout() {
    this.router.navigate(['/logout']);
  }
}
