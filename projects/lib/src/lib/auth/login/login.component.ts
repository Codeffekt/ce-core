import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CeAppAssetsConfig } from '../../ce-core.config';
import { CeAppService } from '../../services/ce-app.service';
import { CeCoreService } from '../../services/ce-core.service';

@Component({
  selector: 'ce-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  appVersion: string;
  form!: UntypedFormGroup;
  error$ = new Subject<string>();
  authenticating$ = new Subject<boolean>();
  assets: CeAppAssetsConfig;
  title: string;

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private coreService: CeCoreService, 
    appService: CeAppService   
  ) {
    this.appVersion = appService.getConfig().version;
    this.assets = appService.getAssets();
    this.title = appService.getTitle();
  }

  async ngOnInit() {
    this.createForm();
    this.checkIfLoggedIn();
  }

  async submit() {
    this.setAuthenticating(true);
    try {
      await this.coreService.authenticate(this.form.value.email, this.form.value.password);
      this.router.navigate(['/']);
    } catch (err) {
      this.error$.next("Erreur lors de l'authentification");
    } finally {
      this.setAuthenticating(false);
    }
  }

  private checkIfLoggedIn() {
    this.setAuthenticating(true);
    if (this.coreService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    this.setAuthenticating(false);
  }

  private createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false, Validators.required]
    });
  }

  private setAuthenticating(isAuthenticating: boolean) {
    this.authenticating$.next(isAuthenticating);
  }
}
