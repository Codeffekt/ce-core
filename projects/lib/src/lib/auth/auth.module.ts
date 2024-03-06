import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
    imports: [
        CommonModule,        
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent,
        LogoutComponent,
    ],
    exports: [
        LoginComponent,
        LogoutComponent
    ]
})
export class CeAuthModule { }
