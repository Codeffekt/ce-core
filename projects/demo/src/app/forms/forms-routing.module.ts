import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    AuthGuard, CeFormAccountUpdaterService,
    CeFormUpdaterService, CeFormEditorComponent,
    FormEditorResolverService
} from '@codeffekt/ce-core';
import { FormResolverService } from './form-resolver.service';
import { FormsFactoryComponent } from './forms-factory/forms-factory.component';
import { FormsListComponent } from './forms-list/forms-list.component';
import { FormsMaskComponent } from './forms-mask/forms-mask.component';
import { FormsQueryComponent } from './forms-query/forms-query.component';
import { FormsComponent } from './forms.component';

const routes: Routes = [
    {
        path: '',
        data: { routeId: 'forms' },
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
            },

            {
                path: 'list',
                component: FormsListComponent
            },
            {
                path: 'instance/:id',
                component: FormsComponent,
                resolve: {
                    form: FormResolverService,
                }
            },
            {
                path: 'mask/:id',
                component: FormsMaskComponent,
                resolve: {
                    form: FormResolverService,
                }
            },
            {
                path: 'factory',
                component: FormsFactoryComponent
            },
            {
                path: 'query',
                canActivate: [AuthGuard],
                component: FormsQueryComponent
            },
            {
                path: 'edit/:form',
                data: { routeId: 'forms.edition' },
                canActivate: [AuthGuard],
                resolve: {
                    form: FormEditorResolverService
                },
                component: CeFormEditorComponent,
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        FormEditorResolverService,
        {
            provide: CeFormUpdaterService,
            useClass: CeFormAccountUpdaterService
        },
    ]
})
export class FormsRoutingModule { }
